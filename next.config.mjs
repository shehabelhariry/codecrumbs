import createMDX from "@next/mdx"

// Set by the GitHub Pages workflow: "/codecrumbs" on github.io, "" on a custom domain
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ["js", "jsx", "md", "mdx"],
}

// Plugins are passed by name so the config stays serializable for Turbopack
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-gfm",
      "remark-frontmatter",
      "remark-mdx-frontmatter",
    ],
    rehypePlugins: [
      // Monokai in both themes, like the old Prism setup
      ["rehype-pretty-code", { theme: "monokai" }],
    ],
  },
})

export default withMDX(nextConfig)
