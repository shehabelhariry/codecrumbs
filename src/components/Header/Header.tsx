import Link from "next/link"
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle"
import { site } from "@/lib/site"
import styles from "./Header.module.scss"

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={`container ${styles.navigation}`}>
        <Link className={styles.logo} href="/">
          {site.wordmark}
        </Link>
        <div className={styles.actions}>
          <Link className={styles.link} href="/blog/">
            Writing
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
