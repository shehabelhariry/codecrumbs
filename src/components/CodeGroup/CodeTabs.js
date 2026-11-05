"use client"

import { Children, useState } from "react"
import styles from "./CodeGroup.module.scss"

export default function CodeTabs({ labels, children }) {
  const [active, setActive] = useState(0)
  const panels = Children.toArray(children)

  return (
    <div className={styles.codeGroup}>
      <div className={styles.tabs} role="tablist">
        {labels.map((label, index) => (
          <button
            key={label + index}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={index === active ? styles.active : undefined}
            onClick={() => setActive(index)}
          >
            {label}
          </button>
        ))}
      </div>
      {panels.map((panel, index) => (
        <div key={index} role="tabpanel" hidden={index !== active}>
          {panel}
        </div>
      ))}
    </div>
  )
}
