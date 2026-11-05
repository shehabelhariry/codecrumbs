// One-off migration: pulls every blogPost from Contentful and writes it to
// content/posts/<slug>.mdx, downloading images into public/images/.
//
//   node --env-file=.env scripts/import-contentful.mjs

import fs from "node:fs/promises"
import path from "node:path"

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env
if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
  throw new Error("Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN in .env")
}

const ROOT = path.resolve(import.meta.dirname, "..")
const POSTS_DIR = path.join(ROOT, "content/posts")
const PUBLIC_DIR = path.join(ROOT, "public")
const API = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/master`

const res = await fetch(
  `${API}/entries?content_type=blogPost&include=2&limit=1000`,
  {
    headers: { Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}` },
  }
)
if (!res.ok) throw new Error(`Contentful: ${res.status} ${await res.text()}`)
const { items, includes } = await res.json()
const assets = new Map(includes.Asset.map((a) => [a.sys.id, a]))

// Downloads an asset once and returns its public URL path
const downloaded = new Map()
async function saveAsset(id, dir, baseName) {
  const key = `${dir}/${id}`
  if (downloaded.has(key)) return downloaded.get(key)
  const { file } = assets.get(id).fields
  const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9.]+/g, "-")
  const name = baseName
    ? slugify(baseName) + path.extname(file.fileName)
    : slugify(file.fileName)
  const urlPath = `/images/${dir}/${name}`
  const data = await fetch(`https:${file.url}`).then((r) => r.arrayBuffer())
  await fs.mkdir(path.join(PUBLIC_DIR, "images", dir), { recursive: true })
  await fs.writeFile(path.join(PUBLIC_DIR, urlPath), Buffer.from(data))
  downloaded.set(key, urlPath)
  return urlPath
}

// Text outside code must not be read as JSX or expressions by MDX
const escapeMdx = (text) =>
  text
    .split(/(`[^`]*`)/)
    .map((part, i) => (i % 2 ? part : part.replace(/([{}<>])/g, "\\$1")))
    .join("")

// Wraps text in a markdown mark, keeping surrounding spaces outside it
const wrap = (text, marker) => {
  const [, lead, body, trail] = text.match(/^(\s*)(.*?)(\s*)$/s)
  return body ? `${lead}${marker}${body}${marker}${trail}` : text
}

const fence = (lang, code) => "```" + lang + "\n" + code.trim() + "\n```"

// The old site encoded code blocks as inline code: "js::\n<code>" for a single
// snippet, or "group<<<html, css>>>\nhtml::\n...\n---\ncss::\n...\n---" for tabs
function codeBlock(value) {
  if (value.startsWith("group<<<")) {
    const sections = value
      .replace(/^group<<<.*?>>>/, "")
      .split(/^---\s*$/m)
      .map((s) => s.trim())
      .filter((s) => s.includes("::"))
    const fences = sections.map((s) => {
      const [lang, ...code] = s.split("::")
      return fence(lang.trim(), code.join("::"))
    })
    return `<CodeGroup>\n\n${fences.join("\n\n")}\n\n</CodeGroup>`
  }
  const [lang, ...code] = value.split("::")
  return fence(lang.trim(), code.join("::"))
}

const isCodeBlock = (node) =>
  node.nodeType === "text" &&
  node.marks.some((m) => m.type === "code") &&
  /^(group<<<|\w+::)/.test(node.value.trim())

function inline(node) {
  if (node.nodeType === "hyperlink") {
    const text = node.content.map(inline).join("") || node.data.uri
    return `[${text}](${node.data.uri})`
  }
  const marks = node.marks.map((m) => m.type)
  if (marks.includes("code")) return "`" + node.value + "`"
  let text = escapeMdx(node.value)
  if (marks.includes("bold")) text = wrap(text, "**")
  if (marks.includes("italic")) text = wrap(text, "_")
  return text
}

// A paragraph can mix prose and code blocks, so it may become several blocks
function paragraph(node) {
  const blocks = []
  let text = ""
  const flush = () => {
    if (text.trim()) blocks.push(text.trim())
    text = ""
  }
  for (const child of node.content) {
    if (isCodeBlock(child)) {
      flush()
      blocks.push(codeBlock(child.value.trim()))
    } else {
      text += inline(child)
    }
  }
  flush()
  return blocks
}

async function block(node, slug) {
  switch (node.nodeType) {
    case "paragraph":
      return paragraph(node)
    case "heading-1":
    case "heading-2":
    case "heading-3":
    case "heading-4":
      return [
        "#".repeat(+node.nodeType.at(-1)) +
          " " +
          node.content.map(inline).join("").trim(),
      ]
    case "blockquote": {
      const lines = (
        await Promise.all(node.content.map((n) => block(n, slug)))
      ).flat()
      return lines.length ? [lines.map((l) => `> ${l}`).join("\n>\n")] : []
    }
    case "embedded-asset-block": {
      const { id } = node.data.target.sys
      const { title, description } = assets.get(id).fields
      const src = await saveAsset(id, `posts/${slug}`)
      return [`![${description || title}](${src})`]
    }
    default:
      throw new Error(`${slug}: unsupported node type ${node.nodeType}`)
  }
}

const yamlString = (value) => JSON.stringify(value ?? "")

await fs.mkdir(POSTS_DIR, { recursive: true })

for (const { fields } of items) {
  const { slug } = fields
  const body = (
    await Promise.all(fields.body.content.map((n) => block(n, slug)))
  )
    .flat()
    .join("\n\n")
  // A post with nothing but a placeholder line was never really published
  const draft = body.trim() === "Coming Soon"

  const frontmatter = {
    title: fields.title,
    date: fields.date.slice(0, 10),
    tag: fields.tag,
    color: fields.color,
    author: fields.author,
    authorImage:
      fields.authorImg &&
      (await saveAsset(fields.authorImg.sys.id, "authors", fields.author)),
    previewImage:
      fields.previewImage &&
      (await saveAsset(fields.previewImage.sys.id, `posts/${slug}`)),
    socialImage:
      fields.socialMediaImg &&
      (await saveAsset(fields.socialMediaImg.sys.id, `posts/${slug}`)),
    ...(draft && { draft: true }),
  }
  const yaml = Object.entries(frontmatter)
    .map(
      ([key, value]) =>
        `${key}: ${typeof value === "boolean" ? value : yamlString(value)}`
    )
    .join("\n")

  await fs.writeFile(
    path.join(POSTS_DIR, `${slug}.mdx`),
    `---\n${yaml}\n---\n\n${body}\n`
  )
  console.log(`${draft ? "draft " : "      "}${slug}`)
}
