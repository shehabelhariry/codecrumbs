import React from "react"
import Link from "gatsby-plugin-transition-link/AniLink"
import styles from "./blog-preview.module.scss"

const BlogPreview = ({ post, isDark }) => {
  // console.log(post)
  return (
    <Link className={styles.blogContainer} to={`/blog/${post.slug}`} fade>
      <div>
        <div className="box">
          {post.previewImage ? (
            <div
              style={{
                backgroundImage: `url(${post.previewImage.file.url})`,
                backgroundSize: "160px",
                height: "240px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundColor: !isDark ? post.color : "#2d2d2d",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
              }}
            ></div>
          ) : null}
          <div className={styles.blogPreviewContentContainer}>
            <div className={styles.tag}>{post.tag}</div>
            <h3 className={styles.blogTitle}>{post.title}</h3>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogPreview
