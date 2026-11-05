export const metadata = {
  title: "Codecrumbs",
  description:
    "It's longer than a tweet but shorter than your average blog post",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
