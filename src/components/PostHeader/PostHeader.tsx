import CategoryLabel from "@/components/CategoryLabel/CategoryLabel"
import type { Post } from "@/lib/posts"
import styles from "./PostHeader.module.scss"

export default function PostHeader({ post }: { post: Post }) {
  return (
    <header className={styles.header}>
      <span className="tag">{post.tag}</span>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.meta}>
        <CategoryLabel category={post.category} />
        <span aria-hidden="true">·</span>
        <time dateTime={post.date}>{post.formattedDate}</time>
        <span aria-hidden="true">·</span>
        <span>{post.author}</span>
      </p>
    </header>
  )
}
