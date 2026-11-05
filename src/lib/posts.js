import fs from "node:fs"
import path from "node:path"

const POSTS_DIR = path.join(process.cwd(), "content/posts")

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
})

export async function getPost(slug) {
  const { default: Content, frontmatter } = await import(
    `../../content/posts/${slug}.mdx`
  )
  return {
    ...frontmatter,
    slug,
    formattedDate: dateFormat.format(new Date(frontmatter.date)),
    Content,
  }
}

// Published posts, newest first
export async function getPosts() {
  const slugs = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
  const posts = await Promise.all(slugs.map(getPost))
  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
}
