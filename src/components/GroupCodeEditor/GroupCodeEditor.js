import React, { useState, useEffect } from "react"
import CopyableCodeSnippet from "../CopyableCodeSnippet/CopyableCodeSnippet"
import CustomInput from "../CustomInput/CustomInput"
import _ from "lodash"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import Button from "../Button/Button"
import SelectionTabs from "../SelectionTabs/SelectionTabs"
import {
  getObjWithUpdatedCodeType,
  getObjectWithAddedGroupCodeItem,
} from "../../utils"

const GroupCodeEditor = ({ item, setValue }) => {
  const [codeGroupItem, setCodeGroupItem] = useState(item)
  const [renderedCodeTypes, setRenderedCodeTypes] = useState(
    item.content.map(item => item.codeType)
  )

  useEffect(() => {
    setRenderedCodeTypes(codeGroupItem.content.map(item => item.codeType))
  }, [codeGroupItem])

  useEffect(() => {
    setValue(codeGroupItem.content)
  }, [codeGroupItem])

  return (
    <div>
      {codeGroupItem.content.map((contentItem, index) => (
        <React.Fragment>
          <div className="blog-creator__blocks__editor-block__actions">
            <a
              onClick={() => {
                if (codeGroupItem) {
                  let newContent = _.cloneDeep(codeGroupItem).content.filter(
                    s => s.codeType !== contentItem.codeType
                  )
                  setCodeGroupItem({ ...codeGroupItem, content: newContent })
                }
              }}
            >
              <FontAwesomeIcon size="1x" icon={faTimes} color="#36c7bb" />
            </a>
          </div>
          {codeGroupItem.options[index] && (
            <SelectionTabs
              values={codeGroupItem.availableCodeTypes.map(i => ({
                label: i,
                value: i,
                disabled: renderedCodeTypes.includes(i),
              }))}
              current={codeGroupItem.options[index].selectionTabs.current}
              onTabChange={tab => {
                if (codeGroupItem) {
                  let newItem = getObjWithUpdatedCodeType(
                    codeGroupItem,
                    codeGroupItem.options[index].selectionTabs.current.value,
                    tab.value
                  )
                  setCodeGroupItem(newItem)
                }
              }}
            />
          )}
          <CopyableCodeSnippet
            codeValue={contentItem.codeValue}
            codeLanguage={contentItem.codeType}
            codeStyle={{
              backgroundColor: "#343434",
              color: "white",
              fontSize: "18px",
              maxWidth: "94vw",
              overflow: "auto",
              borderRadius: "8px",
            }}
          />
          <CustomInput
            defaultValue={contentItem.codeValue}
            type="textarea"
            onChange={e => {
              if (codeGroupItem) {
                let newContent = _.cloneDeep(codeGroupItem).content.map(s => {
                  if (s.codeType === contentItem.codeType) {
                    s.codeValue = e.target.value
                  }
                  return s
                })
                setCodeGroupItem({ ...codeGroupItem, content: newContent })
              }
            }}
          />
        </React.Fragment>
      ))}
      {renderedCodeTypes.length !== codeGroupItem.availableCodeTypes.length ? (
        <Button
          style={{ width: "100%" }}
          onClick={() => {
            let newCodeItem = getObjectWithAddedGroupCodeItem(
              codeGroupItem,
              renderedCodeTypes
            )
            setCodeGroupItem(newCodeItem)
          }}
        >
          Add Code Block
        </Button>
      ) : null}
    </div>
  )
}

export default GroupCodeEditor
