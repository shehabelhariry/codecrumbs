import React, { useState, useEffect } from "react"
import "./CopyableCodeSnippet.scss"
import Prism from "prismjs"
import Button from "../../components/Button/Button"
import { CopyToClipboard } from "react-copy-to-clipboard"

import "prismjs/components/prism-jsx.min"

const CopyableCodeSnippet = props => {
  const { codeValue, codeLanguage, codeStyle } = props
  const [isShown, setIsShown] = useState(false)
  const showSuccessToolTip = () => {
    setIsShown(true)
    setTimeout(() => {
      setIsShown(false)
    }, 800)
  }

  useEffect(() => {
    setTimeout(() => Prism.highlightAll(), 0)
  }, [])

  return (
    <div className="copyable-code-snippet ">
      <div className="copyable-code-snippet-container">
        <div
          className="copyable-code-snippet__success-tooltip"
          style={{ display: isShown ? "block" : "none" }}
        >
          Copied !
        </div>
        <CopyToClipboard
          text={codeValue}
          onCopy={() => {
            showSuccessToolTip()
          }}
        >
          <Button>Copy</Button>
        </CopyToClipboard>
      </div>
      <pre style={codeStyle}>
        <code className={`language-${codeLanguage}`}>{codeValue.trim()}</code>
      </pre>
    </div>
  )
}

export default CopyableCodeSnippet
