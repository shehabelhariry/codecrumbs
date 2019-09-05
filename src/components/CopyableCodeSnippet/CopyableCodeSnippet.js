import React from "react"
import "./CopyableCodeSnippet.scss"
import { default as Prism } from "prismjs"
import Button from "../../components/Button/Button"
import { CopyToClipboard } from "react-copy-to-clipboard"

const CopyableCodeSnippet = props => {
  const { codeValue, codeLanguage, codeStyle } = props
  const copyCode = () => {
    document.execCommand("copy")
  }
  return (
    <div {...props}>
      <CopyToClipboard text="sdasd">
        <Button>Copy</Button>
      </CopyToClipboard>
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
