import React, { useState } from "react"
import "./CopyableCodeSnippet.scss"
import { default as Prism } from "prismjs"
import Button from "../../components/Button/Button"
import { CopyToClipboard } from "react-copy-to-clipboard"

const CopyableCodeSnippet = props => {
  const { codeValue, codeLanguage, codeStyle } = props
  const [isShown, setIsShown] = useState(false)
  const showSuccessToolTip = () => {
    setIsShown(true)
    setTimeout(() => {
      setIsShown(false)
    }, 800)
  }
  return (
    <div {...props}>
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
      <pre
        style={codeStyle}
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(
            codeValue,
            Prism.languages[codeLanguage],
            codeLanguage
          ),
        }}
      />
    </div>
  )
}

export default CopyableCodeSnippet
