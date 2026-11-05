import Link from "next/link"
import styles from "./Button.module.scss"

export default function Button({
  href,
  appearance,
  className,
  children,
  ...props
}) {
  const classes = [
    styles.button,
    appearance === "primary" && styles.primary,
    className,
  ]
    .filter(Boolean)
    .join(" ")
  const label = <span className={styles.label}>{children}</span>

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {label}
      </Link>
    )
  }
  return (
    <button className={classes} {...props}>
      {label}
    </button>
  )
}
