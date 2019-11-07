import React from "react"
import heroStyles from "./Hero.module.scss"
import Img from "../../images/coding.png"
import { useStaticQuery, graphql } from "gatsby"
import BlogPreview from "../BlogPreview/BlogPreview"
import FeaturedBlogTitle from "../FeaturedBlogTitle/FeaturedBlogTitle"

const Hero = () => {
  const blogPosts = useStaticQuery(graphql`
    {
      allContentfulBlogPost {
        nodes {
          title
          date(formatString: "DD MMMM YYYY")
          slug
          previewImage {
            file {
              url
            }
          }
          color
          tag
          body {
            body
          }
        }
      }
    }
  `)

  return (
    <React.Fragment>
      <FeaturedBlogTitle
        heroStyles={heroStyles}
        postTitle={blogPosts.allContentfulBlogPost.nodes[0].title}
        postSlug={blogPosts.allContentfulBlogPost.nodes[0].slug}
        postImg={blogPosts.allContentfulBlogPost.nodes[0].previewImage.file.url}
        postTag={blogPosts.allContentfulBlogPost.nodes[0].tag}
        postColor={blogPosts.allContentfulBlogPost.nodes[0].color}
      />
      <div className={heroStyles.blogPostsContainer}>
        {blogPosts.allContentfulBlogPost.nodes.map(post => {
          return <BlogPreview post={post} key={post.slug} />
        })}
      </div>
      }
    </React.Fragment>
  )
}

export default Hero
