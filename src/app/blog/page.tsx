import type { Metadata } from "next"
import PostPreview from "@/components/PostPreview/PostPreview"
import { getPosts } from "@/lib/posts"
import { site } from "@/lib/site"
import styles from "./page.module.scss"

export const metadata: Metadata = {
  title: `All posts · ${site.name}`,
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className={styles.page}>
      <div className="page-header">
        <h1 className="page-title">{site.name}</h1>
        <p className="page-description">{site.description}</p>
      </div>
      <div className={styles.posts}>
        {posts.map((post) => (
          <PostPreview key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
