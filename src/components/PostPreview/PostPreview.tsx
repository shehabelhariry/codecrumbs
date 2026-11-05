import Link from "next/link"
import CategoryLabel from "@/components/CategoryLabel/CategoryLabel"
import type { Post } from "@/lib/posts"
import styles from "./PostPreview.module.scss"

export default function PostPreview({ post }: { post: Post }) {
  return (
    <Link className={styles.card} href={`/blog/${post.slug}/`}>
      <h3 className={styles.title}>{post.title}</h3>
      {post.summary && <p className={styles.summary}>{post.summary}</p>}
      <div className={styles.meta}>
        <CategoryLabel category={post.category} />
        <time dateTime={post.date} title={post.formattedDate}>
          {post.relativeDate}
        </time>
      </div>
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
