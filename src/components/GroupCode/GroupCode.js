import React, { useState } from "react"
import CopyableCodeSnippet from "../CopyableCodeSnippet/CopyableCodeSnippet"
import "./GroupCode.scss"

const GroupCode = ({ types, codeSnippets }) => {
  const [activeType, setActiveType] = useState(types[0])
  return (
    <div className="group-code">
      <nav className="group-code__nav">
        <ul>
          {types.map(type => (
            <li
              className={`group-code__nav__item ${type === activeType &&
                "active"}`}
              key={type}
              onClick={() => setActiveType(type)}
            >
              <a>{type}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="group-code__panel-container">
        <div className="group-code__panel active">
          <CopyableCodeSnippet
            codeValue={codeSnippets[types.indexOf(activeType)]}
            codeLanguage={activeType}
            codeStyle={{
              backgroundColor: "#343434",
              color: "white",
              fontSize: "18px",
              maxWidth: "94vw",
              overflow: "auto",
              borderRadius: "8px",
            }}
            codeTitleVisibile={false}
          />
        </div>
      </div>
    </div>
  )
}

export default GroupCode
