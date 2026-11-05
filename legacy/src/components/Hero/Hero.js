import React from "react"
import heroStyles from "./Hero.module.scss"
import { useStaticQuery, graphql } from "gatsby"
import BlogPreview from "../BlogPreview/BlogPreview"
import FeaturedBlogTitle from "../FeaturedBlogTitle/FeaturedBlogTitle"

const Hero = ({ isDark }) => {
  const blogPosts = useStaticQuery(graphql`
    {
      allContentfulBlogPost(sort: { fields: date, order: DESC }) {
        nodes {
          title
          date(formatString: "DD MMMM YYYY")
          slug
          previewImage {
            file {
              url
            }
          }
          author
          authorImg {
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
        postTitle={blogPosts.allContentfulBlogPost.nodes[0].title}
        postSlug={blogPosts.allContentfulBlogPost.nodes[0].slug}
        postImg={blogPosts.allContentfulBlogPost.nodes[0].previewImage.file.url}
        postTag={blogPosts.allContentfulBlogPost.nodes[0].tag}
        postColor={
          !isDark ? blogPosts.allContentfulBlogPost.nodes[0].color : "#2d2d2d"
        }
        postAuthor={blogPosts.allContentfulBlogPost.nodes[0].author}
        postAuthorImg={
          blogPosts.allContentfulBlogPost.nodes[0].authorImg.file.url
        }
        date={blogPosts.allContentfulBlogPost.nodes[0].date}
      />
      <div className={heroStyles.blogPostsContainer}>
        {blogPosts.allContentfulBlogPost.nodes.slice(1).map(post => {
          return <BlogPreview post={post} key={post.slug} isDark={isDark} />
        })}
      </div>
    </React.Fragment>
  )
}

export default Hero
