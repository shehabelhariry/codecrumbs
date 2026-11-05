import PostPreview from "@/components/PostPreview/PostPreview"
import { getPosts } from "@/lib/posts"
import { site } from "@/lib/site"
import styles from "./page.module.scss"

export const metadata = {
  title: `${site.name}: All crumbs`,
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className={styles.page}>
      <div className="page-header">
        <h1 className="page-title">{site.name}</h1>
        <p className="page-description">
          It&apos;s shorter than a blog post but longer than a tweet
        </p>
      </div>
      <div className={styles.posts}>
        {posts.map((post) => (
          <PostPreview key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
