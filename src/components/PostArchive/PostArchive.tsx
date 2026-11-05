import Link from "next/link"
import CategoryLabel from "@/components/CategoryLabel/CategoryLabel"
import type { Post } from "@/lib/posts"
import styles from "./PostArchive.module.scss"

// Single-column list of every post, used on /blog/
export default function PostArchive({ posts }: { posts: Post[] }) {
  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li key={post.slug} className={styles.item}>
          <time className={styles.date} dateTime={post.date}>
            {post.formattedDate}
          </time>
          <div>
            <Link className={styles.title} href={`/blog/${post.slug}/`}>
              {post.title}
            </Link>
            <span className={styles.category}>
              <CategoryLabel category={post.category} />
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
