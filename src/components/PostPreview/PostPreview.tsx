import Link from "next/link"
import type { Post } from "@/lib/posts"
import styles from "./PostPreview.module.scss"

export default function PostPreview({ post }: { post: Post }) {
  return (
    <Link className={styles.card} href={`/blog/${post.slug}/`}>
      <span className="tag">{post.tag}</span>
      <h3 className={styles.title}>{post.title}</h3>
      <time className={styles.date} dateTime={post.date}>
        {post.formattedDate}
      </time>
      <svg
        className={styles.arrow}
        viewBox="0 0 24 24"
        width="20"
        height="20"
        aria-hidden="true"
      >
        <path
          d="M7 17 17 7M9 7h8v8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  )
}
