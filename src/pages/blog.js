import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Layout from "../components/Layout"

import blogStyles from "./blog.module.scss"

const BlogPage = () => {
  const blogPosts = useStaticQuery(graphql`
    {
      allContentfulBlogPost {
        nodes {
          title
          date
          slug
          body {
            body
          }
        }
      }
    }
  `)

  console.log(blogPosts)
  return (
    <Layout>
      <div>
        <h1>Blog</h1>
        <p>Posts will show up here </p>

        {blogPosts.allContentfulBlogPost.nodes.map(post => {
          return (
            <div className={blogStyles.blogHeader}>
              <h2>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.date}</p>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default BlogPage
