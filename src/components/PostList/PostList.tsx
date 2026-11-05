import PostPreview from "@/components/PostPreview/PostPreview"
import type { Post } from "@/lib/posts"
import styles from "./PostList.module.scss"

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <PostPreview key={post.slug} post={post} />
      ))}
    </div>
  )
}
