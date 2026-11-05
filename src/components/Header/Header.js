"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Button from "@/components/Button/Button"
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle"
import { site } from "@/lib/site"
import styles from "./Header.module.scss"

export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const isContactPage = usePathname().startsWith("/contact")

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Link className={styles.title} href="/">
          {site.title}
        </Link>
        <button
          type="button"
          className={`${styles.burger} ${menuIsOpen ? styles.burgerOpen : ""}`}
          onClick={() => setMenuIsOpen(!menuIsOpen)}
          aria-label="Menu"
          aria-expanded={menuIsOpen}
        >
          <span />
        </button>
        <ul className={menuIsOpen ? styles.fullScreen : undefined}>
          {!isContactPage && (
            <li>
              <Button href="/contact/" onClick={() => setMenuIsOpen(false)}>
                Say Hi
              </Button>
            </li>
          )}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}
