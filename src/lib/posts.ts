import fs from "node:fs"
import path from "node:path"
import type { ComponentType } from "react"

export const categories = ["code", "life", "thoughts"] as const
export type Category = (typeof categories)[number]

export type PostFrontmatter = {
  title: string
  date: string
  category: Category
  // One line shown under the title on cards; cards skip it while empty
  summary?: string
  tag: string
  color: string
  author: string
  authorImage: string
  previewImage: string
  socialImage?: string
  draft?: boolean
}

export type Post = PostFrontmatter & {
  slug: string
  formattedDate: string
  relativeDate: string
  Content: ComponentType
}

const POSTS_DIR = path.join(process.cwd(), "content/posts")

// Computed at build time, so it is only as fresh as the last deploy
function relativeDate(date: Date, now = new Date()) {
  const days = (now.getTime() - date.getTime()) / 86_400_000
  const years = Math.floor(days / 365.25)
  if (years >= 1)
    return years === 1 ? "About a year ago" : `About ${years} years ago`
  const months = Math.floor(days / 30.44)
  if (months >= 1)
    return months === 1 ? "About a month ago" : `About ${months} months ago`
  return "Recently"
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
})

export async function getPost(slug: string): Promise<Post> {
  const { default: Content, frontmatter } = await import(
    `../../content/posts/${slug}.mdx`
  )
  return {
    ...frontmatter,
    slug,
    formattedDate: dateFormat.format(new Date(frontmatter.date)),
    relativeDate: relativeDate(new Date(frontmatter.date)),
    Content,
  }
}

// Published posts, newest first
export async function getPosts(): Promise<Post[]> {
  const slugs = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
  const posts = await Promise.all(slugs.map(getPost))
  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
}
