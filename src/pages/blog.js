import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/Layout"
import BlogPreview from "../components/BlogPreview/BlogPreview"

import blogStyles from "./blog.module.scss"

const BlogPage = () => {
  const blogPosts = useStaticQuery(graphql`
    {
      allContentfulBlogPost {
        nodes {
          title
          date(formatString: "DD MMMM YYYY")
          slug
          color
          tag
          previewImage {
            file {
              url
            }
          }
          body {
            body
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <div className={blogStyles.pageContainer}>
        <div className="page-header">
          <h2 className="page-title">Codecrumbs</h2>
          <p className="page-description">
            It's shorter than a blog post but longer than a tweet
          </p>
        </div>
        <div className={blogStyles.contentContainer}>
          <div className={blogStyles.postsContainer}>
            {blogPosts.allContentfulBlogPost.nodes.map(post => {
              return <BlogPreview post={post} key={post.slug} />
            })}
          </div>
          <div className={blogStyles.contactSection}></div>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPage
