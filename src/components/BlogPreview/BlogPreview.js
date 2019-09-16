import React from "react"
import Link from "gatsby-plugin-transition-link/AniLink"
import styles from "./blog-preview.module.scss"

const BlogPreview = ({ post }) => {
  console.log(post)
  return (
    <div className={styles.blogContainer}>
      <div className="box">
        {post.previewImage ? (
          <div
            style={{
              backgroundImage: `url(${post.previewImage.file.url})`,
              backgroundSize: "cover",
              height: "300px",
              backgroundPosition: "center",
            }}
          ></div>
        ) : null}
        <div className={styles.infoCircle}>
          <span>2 min</span>
        </div>
        <div className={styles.blogPreviewContentContainer}>
          <div className={styles.tagsContainer}>
            <span className={styles.tag}>CSS</span>
            <span className={styles.tag}>HTML</span>
          </div>
          <h3 className={styles.blogTitle}>
            <Link to={`/blog/${post.slug}`} fade>
              {post.title}
            </Link>
          </h3>
          <p></p>
          {/* <div className={styles.blogInfo}>
            <p>
              <i>Clock</i> 2 minute read
            </p>
            <p>Author: Shehab Elhariry</p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default BlogPreview
