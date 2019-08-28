import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import styles from "./blog-template.module.scss"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      date(formatString: "DD MMMM YYYY")
      slug
      body {
        json
      }
    }
  }
`

const Blog = props => {
  const { data } = props
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.blogTemplate}>
          <h1>{data.contentfulBlogPost.title}</h1>
          <p>{data.contentfulBlogPost.date}</p>
          <div className={styles.blog}>
            {documentToReactComponents(data.contentfulBlogPost.body.json, {
              renderNode: {
                "embedded-asset-block": node => {
                  return (
                    <img
                      class="img-fluid"
                      src={`${node.data.target.fields.file["en-US"].url}`}
                    />
                  )
                },
              },
            })}
          </div>
        </div>
        <div></div>
      </div>
    </Layout>
  )
}

export default Blog
