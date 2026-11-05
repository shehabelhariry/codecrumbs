// Root-relative paths need the GitHub Pages base path ("/codecrumbs") when
// they bypass next/link, e.g. in <img src> and frontmatter image fields
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const withBasePath = (src: string) =>
  src.startsWith("/") ? basePath + src : src

// siteUrl already includes the base path
export const absoluteUrl = (path: string) => siteUrl.replace(/\/$/, "") + path
