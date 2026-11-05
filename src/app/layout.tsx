import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Darker_Grotesque, Fredoka } from "next/font/google"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import SubscribeForm from "@/components/SubscribeForm/SubscribeForm"
import { site } from "@/lib/site"

import "@/styles/globals.scss"
import styles from "./layout.module.scss"

const bodyFont = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
})

const logoFont = Fredoka({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-logo",
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
    <html
      lang="en"
      className={`${bodyFont.variable} ${logoFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className={styles.container}>
          <div className={styles.content}>
            <Header />
            {children}
          </div>
          <SubscribeForm />
          <Footer />
        </div>
      </body>
    </html>
  )
}
