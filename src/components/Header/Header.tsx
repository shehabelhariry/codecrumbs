import Link from "next/link"
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle"
import { site } from "@/lib/site"
import styles from "./Header.module.scss"

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={`container ${styles.navigation}`}>
        <Link
          className={styles.logo}
          href="/"
          aria-label={`${site.name}, home`}
        >
          {/* [what a world]. folds into [waw]. on hover */}
          [w<span className={styles.fold}>hat </span>a
          <span className={styles.fold}> </span>w
          <span className={styles.fold}>orld</span>].
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
