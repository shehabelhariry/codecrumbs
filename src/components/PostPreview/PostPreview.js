import Link from "next/link"
import { withBasePath } from "@/lib/paths"
import styles from "./PostPreview.module.scss"

export default function PostPreview({ post }) {
  return (
    <Link className={styles.card} href={`/blog/${post.slug}/`}>
      {post.previewImage && (
        <div
          className={styles.image}
          style={{
            "--post-color": post.color,
            backgroundImage: `url(${withBasePath(post.previewImage)})`,
          }}
        />
      )}
      <div className={styles.content}>
        <div className={styles.tag}>{post.tag}</div>
        <h3 className={styles.title}>{post.title}</h3>
      </div>
    </Link>
  )
}
