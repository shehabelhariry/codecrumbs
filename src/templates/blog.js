import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faLightbulb } from "@fortawesome/free-solid-svg-icons"
import {
  faFacebookSquare,
  faTwitterSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"

import CopyableCodeSnippet from "../components/CopyableCodeSnippet/CopyableCodeSnippet"

import styles from "./blog-template.module.scss"
import FeaturedBlogTitle from "../components/FeaturedBlogTitle/FeaturedBlogTitle"
import { Helmet } from "react-helmet"
import GroupCode from "../components/GroupCode/GroupCode"

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
      socialMediaImg {
        file {
          url
        }
      }
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
      console.log(node)
      if (node.data.target.fields) {
        return (
          <div className={styles.imgContainer}>
            <img
              class="img-fluid"
              src={`${node.data.target.fields.file["en-US"].url}`}
              alt="attached"
            />
          </div>
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
        if (!node.content[0].value.trim()) return " "
        const isGroupCode = node.content[0].value.startsWith("group<<")
        if (isGroupCode) {
          let groupCodeTypes = node.content[0].value
            .match(/group<<<(.*?)>>>/)[1]
            .split(",")

          let codeSnippets = groupCodeTypes.map(type => {
            let regex = new RegExp(
              `(?<=${type.trim()}::\\s+).*?(?=\\s+---)`,
              "gs"
            )
            return node.content[0].value.match(regex)[0]
          })

          return (
            <GroupCode types={groupCodeTypes} codeSnippets={codeSnippets} />
          )
        }

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
            container.push(
              <a href={item.data.uri} target="_blank" rel="noopener noreferrer">
                {item.data.uri}
              </a>
            )
          } else {
            container.push(<p>{item.value}</p>)
          }
        })
        return <p>{container}</p>
      }

      return (
        <p
          dangerouslySetInnerHTML={{
            __html: node.content[0].value.replace(
              /`(.*?)`/g,
              `<span class="word-highlighted">$1</span>`
            ),
          }}
        />
      )
    },
  },
}

const Blog = props => {
  const { data } = props
  const renderedReactComponents = documentToReactComponents(
    data.contentfulBlogPost.body.json,
    customRenderOptions
  )

  const [isDark, setIsDark] = useState(false)
  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <Layout>
      <div className={styles.container} data-theme={isDark ? "dark" : ""}>
        <div className={styles.blogTemplate}>
          <Helmet>
            <meta
              property="og:image"
              content={data.contentfulBlogPost.socialMediaImg.file.url}
            />
            <meta property="og:title" content={data.contentfulBlogPost.title} />
            <meta
              name="twitter:image"
              content={data.contentfulBlogPost.socialMediaImg.file.url}
            />
            <meta
              name="twitter:title"
              content={data.contentfulBlogPost.title}
            />
            <meta property="og:site_name" content="codecrumbs"></meta>
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
                rel="noopener noreferrer"
                className={styles.socialMediaIcon}
              >
                <FontAwesomeIcon size="2x" icon={faFacebookSquare} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://twitter.com/intent/tweet/?text=${data.contentfulBlogPost.title}&url=https://codecrumbs.netlify.com/blog/${data.contentfulBlogPost.slug}&via=cheha6`}
                className={styles.socialMediaIcon}
              >
                <FontAwesomeIcon size="2x" icon={faTwitterSquare} />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=https://codecrumbs.netlify.com/blog/${data.contentfulBlogPost.slug}&title=${data.contentfulBlogPost.title}&source=https://codecrumbs.netlify.com/`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialMediaIcon}
              >
                <FontAwesomeIcon size="2x" icon={faLinkedin} />
              </a>
            </div>
            <div className={styles.blog}>{renderedReactComponents}</div>
            <a onClick={toggleTheme} className={styles.themeIcon}>
              <FontAwesomeIcon size="2x" icon={isDark ? faLightbulb : faMoon} />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Blog
