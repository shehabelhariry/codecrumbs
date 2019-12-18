import React, { useState } from "react"
import CustomInput from "../CustomInput/CustomInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"
import SelectionTabs from "../SelectionTabs/SelectionTabs"
import _ from "lodash"
import CopyableCodeSnippet from "../CopyableCodeSnippet/CopyableCodeSnippet"
import Button from "../Button/Button"

const Editor = ({
  item,
  blockStyles,
  selected,
  setSelected,
  setIsEdit,
  onSave,
}) => {
  const [value, setValue] = useState(item.content)
  const [codeValue, setCodeValue] = useState(item.content)
  const selectionTabClone = _.cloneDeep(item.options.selectionTabs)
  const clickablesClone = _.cloneDeep(item.options.clickables)
  return (
    <div className={`${blockStyles[item.type]} edit`}>
      <div className="blog-creator__blocks__editor-block__actions">
        {selectionTabClone ? (
          <SelectionTabs
            values={selectionTabClone.values}
            current={selectionTabClone.current}
            onTabChange={tab => {
              const newSelected = _.cloneDeep(selected).map(sItem => {
                if (sItem.id === item.id) {
                  sItem.options.selectionTabs.current.label = tab.label
                  sItem.options.selectionTabs.current.value = tab.value
                }
                return sItem
              })
              setSelected(newSelected)
            }}
          />
        ) : null}
        {clickablesClone.length > 0 ? (
          <div className="selection-tabs">
            <span>Click to copy</span>
            <div>
              {clickablesClone.map(clickable => {
                return (
                  <a
                    className="selection-tabs__item action"
                    onClick={clickable.action}
                  >
                    {clickable.type}
                  </a>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
      <span className={`content  ${item.options.selectionTabs.current.value}`}>
        {item.type === "code" ? (
          <CopyableCodeSnippet
            codeValue={codeValue}
            editable={true}
            codeTitleVisibile={false}
            codeLanguage={item.options.selectionTabs.current.value}
            codeStyle={{
              backgroundColor: "#343434",
              color: "white",
              fontSize: "18px",
              maxWidth: "94vw",
              overflow: "auto",
              borderRadius: "8px",
            }}
          />
        ) : null}
        <CustomInput
          defaultValue={item.content}
          placeholder={item.type}
          onChange={e => {
            setValue(e.target.value)
            if (item.type === "code") {
              setCodeValue(e.target.value)
            }
          }}
          type={
            item.type === "paragraph" ||
            item.type === "blockquote" ||
            item.type === "code"
              ? "textarea"
              : null
          }
          noMargin
        />
      </span>
      <div className="blog-creator__blocks__editor-block__actions">
        <a
          onClick={() => {
            setIsEdit(false)
            onSave(value)
          }}
        >
          <FontAwesomeIcon size="1x" icon={faSave} color="#36c7bb" />
          <span>Save</span>
        </a>
      </div>
    </div>
  )
}

export default Editor
