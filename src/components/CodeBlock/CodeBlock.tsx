"use client"

import { useRef, useState, type ComponentProps } from "react"
import styles from "./CodeBlock.module.scss"

// Replaces the <pre> that rehype-pretty-code renders for each fenced block
type CodeBlockProps = ComponentProps<"pre"> & { "data-language"?: string }

export default function CodeBlock({ children, ...props }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)
  const language = props["data-language"]

  const copy = async () => {
    await navigator.clipboard.writeText(preRef.current?.textContent ?? "")
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className={styles.codeBlock}>
      <div className={styles.toolbar}>
        {language && (
          <span className={styles.language} data-code-language>
            {language}
          </span>
        )}
        <button type="button" className={styles.copy} onClick={copy}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  )
}
