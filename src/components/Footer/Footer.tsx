import { site } from "@/lib/site"
import styles from "./Footer.module.scss"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span>
          © 2019–{new Date().getFullYear()} {site.author}
        </span>
        <span>Made with curiosity.</span>
      </div>
    </footer>
  )
}
