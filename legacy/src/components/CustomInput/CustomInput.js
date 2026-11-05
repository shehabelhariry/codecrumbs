import React from "react"
import styles from "./CustomInput.module.scss"

const CustomInput = ({
  name,
  type,
  placeholder,
  defaultValue = "",
  required = false,
  onChange = () => {},
  noMargin = false,
}) => {
  const input =
    type === "textarea" ? (
      <textarea
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        required
        defaultValue={defaultValue}
      ></textarea>
    ) : (
      <input
        onChange={onChange}
        name={name}
        type={type || "text"}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required
      />
    )

  return (
    <div
      className={styles.customInput}
      style={noMargin ? { marginBottom: 0 } : null}
    >
      {input}
    </div>
  )
}

export default CustomInput
