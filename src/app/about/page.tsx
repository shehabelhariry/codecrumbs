import type { Metadata } from "next"
import { absoluteUrl } from "@/lib/paths"
import { site } from "@/lib/site"
import styles from "./page.module.scss"

export const metadata: Metadata = {
  title: `About · ${site.name}`,
  alternates: { canonical: absoluteUrl("/about/") },
}

// Placeholder until the full About page is written
export default function AboutPage() {
  return (
    <div className="container">
      <div className={styles.about}>
        <h1>About</h1>
        <p>More soon.</p>
      </div>
    </div>
  )
}
