import React from "react"
import heroStyles from "./Hero.module.scss"
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

  const lastIndex = blogPosts.allContentfulBlogPost.nodes.length - 1
  return (
    <React.Fragment>
      <FeaturedBlogTitle
        heroStyles={heroStyles}
        postTitle={blogPosts.allContentfulBlogPost.nodes[lastIndex].title}
        postSlug={blogPosts.allContentfulBlogPost.nodes[lastIndex].slug}
        postImg={
          blogPosts.allContentfulBlogPost.nodes[lastIndex].previewImage.file.url
        }
        postTag={blogPosts.allContentfulBlogPost.nodes[lastIndex].tag}
        postColor={blogPosts.allContentfulBlogPost.nodes[lastIndex].color}
      />
      <div className={heroStyles.blogPostsContainer}>
        {blogPosts.allContentfulBlogPost.nodes.slice(0, -1).map(post => {
          return <BlogPreview post={post} key={post.slug} />
        })}
      </div>
    </React.Fragment>
  )
}

export default Hero
