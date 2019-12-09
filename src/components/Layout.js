import React, { useState, useEffect } from "react"
import Footer from "../components/footer"
import Header from "../components/Header"

import "../styles/index.scss"
import LayoutStyles from "./Layout.module.scss"

const Layout = props => {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    if (localStorage.getItem("darkTheme")) {
      setIsDark(localStorage.getItem("darkTheme") === "true")
    }
  }, [])
  const toggleTheme = () => {
    localStorage.setItem("darkTheme", !isDark)
    setIsDark(!isDark)
  }
  return (
    <div className={LayoutStyles.container} data-theme={isDark ? "dark" : ""}>
      <div className={LayoutStyles.contentContainer}>
        <Header
          noContactButton={props.noContactButton}
          toggleTheme={toggleTheme}
        />
        {props.children(isDark)}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
