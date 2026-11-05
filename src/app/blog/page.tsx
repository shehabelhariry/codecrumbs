import type { Metadata } from "next"
import PostArchive from "@/components/PostArchive/PostArchive"
import { absoluteUrl } from "@/lib/paths"
import { getPosts } from "@/lib/posts"
import { site } from "@/lib/site"
import styles from "./page.module.scss"

export const metadata: Metadata = {
  title: `Writing · ${site.name}`,
  alternates: { canonical: absoluteUrl("/blog/") },
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="container">
      <div className={styles.archive}>
        <h1>Writing</h1>
        <PostArchive posts={posts} />
      </div>
    </div>
  )
}
