"use client"

import { useEffect, useState } from "react"
import styles from "./ThemeToggle.module.scss"

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <path
      fill="currentColor"
      d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
    />
  </svg>
)

const BulbIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2Zm-3 18h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1Z"
    />
  </svg>
)

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  // The inline script in the root layout picks the theme before hydration
  useEffect(() => {
    setIsDark(document.documentElement.dataset.theme === "dark")
  }, [])

  const toggleTheme = () => {
    const nextIsDark = !isDark
    if (nextIsDark) document.documentElement.dataset.theme = "dark"
    else delete document.documentElement.dataset.theme
    try {
      localStorage.setItem("darkTheme", String(nextIsDark))
    } catch {}
    setIsDark(nextIsDark)
  }

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? <BulbIcon /> : <MoonIcon />}
    </button>
  )
}
