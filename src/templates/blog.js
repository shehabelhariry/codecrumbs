import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"

import CopyableCodeSnippet from "../components/CopyableCodeSnippet/CopyableCodeSnippet"

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

const customRenderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      if (node.data.target.file) {
        return (
          <img
            class="img-fluid"
            src={`${node.data.target.fields.file["en-US"].url}`}
            alt="attached"
          />
        )
      }
    },
    [BLOCKS.PARAGRAPH]: node => {
      if (
        node &&
        node.content &&
        node.content[0].marks &&
        node.content[0].marks[0] &&
        node.content[0].marks[0].type === "code"
      ) {
        const codeType = node.content[0].value.split("::")[0]
        const codeValue = node.content[0].value.split("::")[1].trim()
        // return <span>sadasdsa</span>
        return (
          <CopyableCodeSnippet
            codeValue={codeValue}
            codeLanguage={codeType}
            codeStyle={{
              backgroundColor: "#343434",
              color: "white",
              fontSize: "18px",
              maxWidth: "94vw",
              overflow: "auto",
              borderRadius: "8px",
            }}
          />
        )
      }

      if (node.content.length > 1) {
        const container = []
        node.content.forEach((item, index) => {
          if (item.nodeType === "hyperlink") {
            container.push(<a href={item.data.uri}>{item.data.uri}</a>)
          } else {
            container.push(<p>{item.value}</p>)
          }
        })
        return <p>{container}</p>
      }

      return <p>{node.content[0].value}</p>
    },
  },
}

const Blog = props => {
  const { data } = props
  console.log(data)
  const renderedReactComponents = documentToReactComponents(
    data.contentfulBlogPost.body.json,
    customRenderOptions
  )

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.blogTemplate}>
          <h1>{data.contentfulBlogPost.title}</h1>
          <p>{data.contentfulBlogPost.date}</p>
          <div className={styles.blog}>{renderedReactComponents}</div>
        </div>
        <div></div>
      </div>
    </Layout>
  )
}

export default Blog
