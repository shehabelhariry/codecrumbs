import type { ComponentProps } from "react"
import styles from "./Button.module.scss"

type ButtonProps = ComponentProps<"button"> & { appearance?: "primary" }

export default function Button({
  appearance,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = [
    styles.button,
    appearance === "primary" && styles.primary,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button className={classes} {...props}>
      <span className={styles.label}>{children}</span>
    </button>
  )
}
