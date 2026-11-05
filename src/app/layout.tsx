import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { site } from "@/lib/site"

import "@/styles/globals.scss"
import styles from "./layout.module.scss"

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Runs before the first paint so a saved dark theme never flashes light
const themeScript = `try {
  var saved = localStorage.getItem("darkTheme")
  var dark = saved ? saved === "true" : matchMedia("(prefers-color-scheme: dark)").matches
  if (dark) document.documentElement.dataset.theme = "dark"
} catch (e) {}`

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className={styles.page}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
