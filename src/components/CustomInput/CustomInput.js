import React from "react"
import styles from "./CustomInput.module.scss"

const CustomInput = ({ name, type, label }) => {
  const input =
    type === "textarea" ? (
      <textarea name={name} placeholder={label}></textarea>
    ) : (
      <input name={name} type="text" placeholder={label} />
    )
  console.log(styles)
  return <div className={styles.customInput}>{input}</div>
}

export default CustomInput
