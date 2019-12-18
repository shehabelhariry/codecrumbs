import React, { useState } from "react"
import "./SelectionTabs.scss"

const SelectionTabs = ({ onTabChange, values, current }) => {
  const [activeTab, setActiveTab] = useState(current.value)
  return (
    <div className="selection-tabs">
      <span>Options</span>
      <div>
        {values.map(tab => (
          <a
            key={tab.value}
            className={`selection-tabs__item ${
              tab.value === activeTab ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab(tab.value)
              onTabChange(Object.assign({}, tab))
            }}
          >
            {tab.label}
          </a>
        ))}
      </div>
    </div>
  )
}

export default SelectionTabs
