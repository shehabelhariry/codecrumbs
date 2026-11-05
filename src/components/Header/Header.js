import Link from "next/link"
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle"
import { site } from "@/lib/site"
import styles from "./Header.module.scss"

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Link className={styles.title} href="/">
          {site.title}
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  )
}
