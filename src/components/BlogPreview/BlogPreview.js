import React from "react"
import { Link } from "gatsby"
import styles from "./blog-preview.module.scss"

const BlogPreview = ({ post }) => {
  return (
    <div className={styles.blogContainer}>
      <h3 className={styles.blogTitle}>
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <span className={styles.blogInfo}>
        By <a>Shehab Elhariry</a> on {post.date}
      </span>
    </div>
  )
}

export default BlogPreview
