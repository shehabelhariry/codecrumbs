import React from "react"
import Link from "gatsby-plugin-transition-link/AniLink"
import styles from "./FeaturedBlogTitle.module.scss"

const FeaturedBlogTitle = ({
  postAuthor = "",
  postTitle = "",
  postSlug = "",
  postImg = "",
  postColor = "",
  isFeatured = true,
  postAuthorImg = "",
  date = "",
}) => {
  return (
    <div
      className={styles.featuredContainer}
      style={{ backgroundColor: postColor }}
    >
      <div className={styles.featured}>
        <div className={styles.featuredContent}>
          {isFeatured ? (
            <span className={styles.featuredTag}>Featured</span>
          ) : (
            ""
          )}
          <h3>
            <Link to={`/blog/${postSlug}`} fade>
              {postTitle}
            </Link>
          </h3>
          {!isFeatured ? (
            <div className={styles.authorInfo}>
              <div
                style={{ backgroundImage: `url(${postAuthorImg})` }}
                alt="author"
                className={styles.authorImg}
              />
              <div className={styles.postDetailsContainer}>
                <span className={styles.authorName}>{postAuthor}</span>
                <span className={styles.postDate}>{date}</span>
              </div>
            </div>
          ) : null}
        </div>
        <img src={postImg} alt="featured" />
      </div>
    </div>
  )
}

export default FeaturedBlogTitle
