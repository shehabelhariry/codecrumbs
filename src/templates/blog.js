import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

// import blogTempateStyles from "./blog-template.module.scss"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      date
      slug
      body {
        body
      }
    }
  }
`

const Blog = props => {
  // const { data } = props
  console.log(props)
  return (
    <Layout>
      {/* <div>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <p>{data.markdownRemark.frontmatter.date}</p>
        <div
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        ></div>
      </div> */}
    </Layout>
  )
}

export default Blog
