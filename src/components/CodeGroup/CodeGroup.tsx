import { Children, isValidElement, type ReactNode } from "react"
import CodeTabs from "./CodeTabs"

// Finds the language rehype-pretty-code put on a block's <pre> or <figure>
type BlockProps = { "data-language"?: string; children?: ReactNode }

function findLanguage(element: ReactNode): string | null {
  if (!isValidElement<BlockProps>(element)) return null
  if (element.props["data-language"]) return element.props["data-language"]
  for (const child of Children.toArray(element.props.children)) {
    const language = findLanguage(child)
    if (language) return language
  }
  return null
}

// Shows several fenced code blocks as tabs, one per language
export default function CodeGroup({ children }: { children: ReactNode }) {
  const blocks = Children.toArray(children).filter(isValidElement)
  const labels = blocks.map((block) => findLanguage(block) ?? "code")
  return <CodeTabs labels={labels}>{blocks}</CodeTabs>
}
