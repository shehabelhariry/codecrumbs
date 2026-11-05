import createMDX from "@next/mdx"
import type { NextConfig } from "next"

// Set by the GitHub Pages workflow: "/codecrumbs" on github.io, "" on a custom domain
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
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
      [
        "rehype-pretty-code",
        { theme: { light: "github-light", dark: "github-dark" } },
      ],
    ],
  },
})

export default withMDX(nextConfig)
