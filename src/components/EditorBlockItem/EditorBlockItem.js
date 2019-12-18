import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import Editor from "./Editor"
import "./EditorBlockItem.scss"
import CopyableCodeSnippet from "../CopyableCodeSnippet/CopyableCodeSnippet"

const EditorBlockItem = ({ item, onSave, setSelected, selected, items }) => {
  const [isEdit, setIsEdit] = useState(false)

  const blockStyles = {
    paragraph: "blog-creator__blocks__editor-block--paragraph",
    header: "blog-creator__blocks__editor-block--header",
  }

  const deleteItem = item => {
    let newSelected = selected.slice(0)
    setSelected(newSelected.filter(selectedItem => selectedItem.id !== item.id))
  }
  return (
    <React.Fragment>
      {isEdit ? (
        <Editor
          item={item}
          blockStyles={blockStyles}
          selected={selected}
          setSelected={setSelected}
          setIsEdit={setIsEdit}
          onSave={onSave}
          items={items}
        />
      ) : (
        <div className={blockStyles[item.type]}>
          <div className="blog-creator__blocks__editor-block__actions">
            <a className="edit-button" onClick={() => setIsEdit(true)}>
              <FontAwesomeIcon size="1x" icon={faEdit} color="#36c7bb" />
            </a>
            <a
              className="edit-button"
              onClick={() => {
                deleteItem(item)
              }}
            >
              <FontAwesomeIcon size="1x" icon={faTrash} color="#36c7bb" />
            </a>
          </div>
          {item.type === "code" ? (
            <span
              className={`content ${item.options.selectionTabs.current.value}`}
            >
              <CopyableCodeSnippet
                codeValue={item.content}
                codeLanguage={item.options.selectionTabs.current.value}
                codeTitleVisibile={false}
                codeStyle={{
                  backgroundColor: "#343434",
                  color: "white",
                  fontSize: "18px",
                  maxWidth: "94vw",
                  overflow: "auto",
                  borderRadius: "8px",
                }}
              />
            </span>
          ) : (
            <span
              className={`content ${item.options.selectionTabs.current.value}`}
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          )}
        </div>
      )}
    </React.Fragment>
  )
}

export default EditorBlockItem
