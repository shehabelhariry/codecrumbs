import { site } from "@/lib/site"
import styles from "./Footer.module.scss"

export default function Footer() {
  return (
    <footer className={`container ${styles.footer}`}>
      © 2019–{new Date().getFullYear()} {site.author}
    </footer>
  )
}
