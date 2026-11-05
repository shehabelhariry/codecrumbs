import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Manrope, Newsreader } from "next/font/google"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { absoluteUrl } from "@/lib/paths"
import { site } from "@/lib/site"

import "@/styles/globals.scss"
import styles from "./layout.module.scss"

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
})

// Titles only: intro, cards and post headings
const serif = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-serif",
})

// Runs before the first paint so a saved dark theme never flashes light
const themeScript = `try {
  var saved = localStorage.getItem("darkTheme")
  var dark = saved ? saved === "true" : matchMedia("(prefers-color-scheme: dark)").matches
  if (dark) document.documentElement.dataset.theme = "dark"
} catch (e) {}`

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: site.name,
  description: site.description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    siteName: site.name,
    type: "website",
    images: [site.socialImage],
  },
  twitter: { card: "summary_large_image", images: [site.socialImage] },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
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
