import type { CSSProperties } from "react"
import Link from "next/link"
import type { Post } from "@/lib/posts"
import { withBasePath } from "@/lib/paths"
import styles from "./PostHeader.module.scss"

// Coloured banner with the post title, used for the featured post on the
// home page and at the top of each post
type PostHeaderProps = { post: Post; featured?: boolean }

export default function PostHeader({
  post,
  featured = false,
}: PostHeaderProps) {
  return (
    <div
      className={styles.container}
      style={{ "--post-color": post.color } as CSSProperties}
    >
      <div className={styles.header}>
        <div className={styles.content}>
          {featured && <span className={styles.featuredTag}>Featured</span>}
          {featured ? (
            <h2 className={styles.title}>
              <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
            </h2>
          ) : (
            <h1 className={styles.title}>{post.title}</h1>
          )}
          <div className={styles.authorInfo}>
            <img
              src={withBasePath(post.authorImage)}
              alt=""
              className={styles.authorImage}
            />
            <div className={styles.details}>
              <span className={styles.authorName}>{post.author}</span>
              <time className={styles.date} dateTime={post.date}>
                {post.formattedDate}
              </time>
            </div>
          </div>
        </div>
        <img
          src={withBasePath(post.previewImage)}
          alt=""
          className={styles.previewImage}
        />
      </div>
    </div>
  )
}
