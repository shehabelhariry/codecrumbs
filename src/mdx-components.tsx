import type { MDXComponents } from "mdx/types"
import CodeBlock from "@/components/CodeBlock/CodeBlock"
import CodeGroup from "@/components/CodeGroup/CodeGroup"
import { withBasePath } from "@/lib/paths"

const components: MDXComponents = {
  pre: CodeBlock,
  CodeGroup,
  img: ({ src, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === "string" ? withBasePath(src) : src}
      alt={alt}
      loading="lazy"
      {...props}
    />
  ),
  a: ({ href = "", ...props }) =>
    href.startsWith("http") ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ) : (
      <a href={href} {...props} />
    ),
}

export function useMDXComponents(): MDXComponents {
  return components
}
