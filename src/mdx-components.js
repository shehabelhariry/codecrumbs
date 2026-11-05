import CodeBlock from "@/components/CodeBlock/CodeBlock"
import CodeGroup from "@/components/CodeGroup/CodeGroup"
import { withBasePath } from "@/lib/paths"

const components = {
  pre: CodeBlock,
  CodeGroup,
  img: ({ src, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={withBasePath(src)} alt={alt} loading="lazy" {...props} />
  ),
  a: ({ href, ...props }) =>
    href.startsWith("http") ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ) : (
      <a href={href} {...props} />
    ),
}

export function useMDXComponents() {
  return components
}
