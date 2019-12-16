import React, { useState, useEffect } from "react"
import "./CopyableCodeSnippet.scss"
import Prism from "prismjs"
import Button from "../../components/Button/Button"
import { CopyToClipboard } from "react-copy-to-clipboard"

import "prismjs/components/prism-jsx.min"
import CustomInput from "../CustomInput/CustomInput"

const CopyableCodeSnippet = props => {
  const {
    codeValue,
    codeLanguage,
    codeStyle,
    codeTitleVisibile = true,
    editable = false,
  } = props
  const [isShown, setIsShown] = useState(false)
  const showSuccessToolTip = () => {
    setIsShown(true)
    setTimeout(() => {
      setIsShown(false)
    }, 800)
  }

  useEffect(() => {
    setTimeout(() => Prism.highlightAll(), 0)
  }, [codeLanguage, codeValue])

  return (
    <div className="copyable-code-snippet ">
      {codeTitleVisibile && (
        <div className="copyable-code-snippet__code-type">{codeLanguage}</div>
      )}
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
          <Button>Copy </Button>
        </CopyToClipboard>
      </div>
      <pre style={codeStyle}>
        <code className={`language-${codeLanguage.trim()}`}>
          {codeValue.trim()}
        </code>
      </pre>
    </div>
  )
}

export default CopyableCodeSnippet
