import { site } from "@/lib/site"
import styles from "./Footer.module.scss"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Created by {site.author}, © 2019</p>
    </footer>
  )
}
