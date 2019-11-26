import React from "react"
import styles from "./CustomInput.module.scss"

const CustomInput = ({ name, type, label, required = false }) => {
  const input =
    type === "textarea" ? (
      <textarea name={name} placeholder={label} required></textarea>
    ) : (
      <input name={name} type={type || "text"} placeholder={label} required />
    )
  console.log(styles)
  return <div className={styles.customInput}>{input}</div>
}

export default CustomInput
