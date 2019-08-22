const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require("path")

module.exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    // const slug = createFilePath({ node, getNode, basePath: `pages` })
    const slug = path.basename(node.fileAbsolutePath, ".md")
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async function({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const contentFullData = await graphql(`
    query {
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

  console.log(contentFullData)

  data.allMarkdownRemark.edges.forEach(edge => {
    console.log(edge)
    const slug = edge.node.fields.slug
    actions.createPage({
      path: `blog/${slug}`,
      component: require.resolve(`./src/templates/blog.js`),
      context: { slug: slug },
    })
  })

  // data.allMarkdownRemark.edges.forEach(edge => {
  //   console.log(edge)
  //   const slug = edge.node.fields.slug
  //   actions.createPage({
  //     path: `blog/${slug}`,
  //     component: require.resolve(`./src/templates/blog.js`),
  //     context: { slug: slug },
  //   })
  // })
}
