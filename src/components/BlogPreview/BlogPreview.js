import React from "react"
import Link from "gatsby-plugin-transition-link/AniLink"
import styles from "./blog-preview.module.scss"

const BlogPreview = ({ post }) => {
  return (
    <div className={styles.blogContainer}>
      <div className="box">
        <h3 className={styles.blogTitle}>
          <Link to={`/blog/${post.slug}`} fade>
            {post.title}
          </Link>
        </h3>
        {post.previewImage ? (
          <img src={post.previewImage.file.url} alt="post preview" />
        ) : null}
        <span className={styles.blogInfo}>
          By <a href="#!">Shehab Elhariry</a> on {post.date}
        </span>
      </div>
    </div>
  )
}

export default BlogPreview
