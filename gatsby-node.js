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
  // const { data } = await graphql(`
  //   query {
  //     allMarkdownRemark {
  //       edges {
  //         node {
  //           fields {
  //             slug
  //           }
  //         }
  //       }
  //     }
  //   }
  // `)
  // data.allMarkdownRemark.edges.forEach(edge => {
  //   const slug = edge.node.fields.slug
  //   actions.createPage({
  //     path: `blog/${slug}`,
  //     component: require.resolve(`./src/templates/blog.js`),
  //     context: { slug: slug },
  //   })
  // })
  //   const contentFullData = await graphql(`
  //     query {
  //       allContentfulBlogPost {
  //         nodes {
  //           title
  //           date
  //           slug
  //           body {
  //             body
  //           }
  //         }
  //       }
  //     }
  //   `)
  //   contentFullData.data.allContentfulBlogPost.nodes.forEach(edge => {
  //     const slug = edge.slug
  //     actions.createPage({
  //       path: `blog/${slug}`,
  //       component: require.resolve(`./src/templates/blog.js`),
  //       context: { slug: slug },
  //     })
  //   })
}
