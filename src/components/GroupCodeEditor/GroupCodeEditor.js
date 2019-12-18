import React, { useState, useEffect } from "react"
import CopyableCodeSnippet from "../CopyableCodeSnippet/CopyableCodeSnippet"
import CustomInput from "../CustomInput/CustomInput"
import _ from "lodash"

const GroupCodeEditor = ({ item, setValue }) => {
  const [codeGroupItem, setCodeGroupItem] = useState(item)

  useEffect(() => {
    setValue(codeGroupItem.content)
  }, [codeGroupItem])
  return (
    <div>
      {codeGroupItem.content.map((contentItem, index) => (
        <React.Fragment>
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
                console.log(_.cloneDeep(codeGroupItem))
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
    </div>
  )
}

export default GroupCodeEditor
