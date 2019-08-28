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
  const { data } = props
  console.log(props)
  return (
    <Layout>
      <div>
        <h1>{data.contentfulBlogPost.title}</h1>
        <p>{data.contentfulBlogPost.date}</p>
        {/* <div
          dangerouslySetInnerHTML={{
            __html: data.contentfulBlogPost.body.content.content.value,
          }}
        ></div> */}
      </div>
    </Layout>
  )
}

export default Blog
