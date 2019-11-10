import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookSquare,
  faTwitterSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"

import CopyableCodeSnippet from "../components/CopyableCodeSnippet/CopyableCodeSnippet"

import styles from "./blog-template.module.scss"
import FeaturedBlogTitle from "../components/FeaturedBlogTitle/FeaturedBlogTitle"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      color
      author
      authorImg {
        file {
          url
        }
      }
      previewImage {
        file {
          url
        }
      }
      date(formatString: "DD MMMM YYYY")
      slug
      socialMediaImg {
        file {
          url
        }
      }
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
  const renderedReactComponents = documentToReactComponents(
    data.contentfulBlogPost.body.json,
    customRenderOptions
  )

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.blogTemplate}>
          <Helmet>
            <meta
              property="og:image"
              content={data.contentfulBlogPost.socialMediaImg.file.url}
            />
          </Helmet>
          <FeaturedBlogTitle
            postTitle={data.contentfulBlogPost.title}
            isFeatured={false}
            postImg={data.contentfulBlogPost.previewImage.file.url}
            postColor={data.contentfulBlogPost.color}
            postAuthor={data.contentfulBlogPost.author}
            postAuthorImg={data.contentfulBlogPost.authorImg.file.url}
            date={data.contentfulBlogPost.date}
          />
          <div className={styles.blogWrappper}>
            <div className={styles.socialMediaIcons}>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://codecrumbs.netlify.com/blog/${data.contentfulBlogPost.slug}`}
                target="_blank"
                className={styles.socialMediaIcon}
              >
                <FontAwesomeIcon size="2x" icon={faFacebookSquare} />
              </a>
              <a
                target="_blank"
                href={`https://twitter.com/intent/tweet/?text=${data.contentfulBlogPost.title}&url=https://codecrumbs.netlify.com/blog/${data.contentfulBlogPost.slug}&via=cheha6`}
                className={styles.socialMediaIcon}
              >
                <FontAwesomeIcon size="2x" icon={faTwitterSquare} />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=https://codecrumbs.netlify.com/blog/${data.contentfulBlogPost.slug}&title=${data.contentfulBlogPost.title}&source=https://codecrumbs.netlify.com/`}
                target="_blank"
                className={styles.socialMediaIcon}
              >
                <FontAwesomeIcon size="2x" icon={faLinkedin} />
              </a>
            </div>
            <div className={styles.blog}>{renderedReactComponents}</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Blog
