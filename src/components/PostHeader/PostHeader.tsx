import type { CSSProperties } from "react"
import type { Post } from "@/lib/posts"
import { withBasePath } from "@/lib/paths"
import styles from "./PostHeader.module.scss"

export default function PostHeader({ post }: { post: Post }) {
  return (
    <header className={styles.header}>
      <div>
        <p className="tag">{post.tag}</p>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <img
            src={withBasePath(post.authorImage)}
            alt=""
            className={styles.avatar}
          />
          <span>{post.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{post.formattedDate}</time>
        </div>
      </div>
      <div
        className={styles.illustration}
        style={{ "--post-color": post.color } as CSSProperties}
      >
        <img src={withBasePath(post.previewImage)} alt="" />
      </div>
    </header>
  )
}
