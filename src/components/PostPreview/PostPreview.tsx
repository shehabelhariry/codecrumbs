import type { CSSProperties } from "react"
import Link from "next/link"
import type { Post } from "@/lib/posts"
import { withBasePath } from "@/lib/paths"
import styles from "./PostPreview.module.scss"

export default function PostPreview({ post }: { post: Post }) {
  return (
    <Link className={styles.card} href={`/blog/${post.slug}/`}>
      <div
        className={styles.image}
        style={{ "--post-color": post.color } as CSSProperties}
      >
        <img src={withBasePath(post.previewImage)} alt="" />
      </div>
      <div className={styles.content}>
        <span className="tag">{post.tag}</span>
        <h2 className={styles.title}>{post.title}</h2>
        <time className={styles.date} dateTime={post.date}>
          {post.formattedDate}
        </time>
      </div>
    </Link>
  )
}
