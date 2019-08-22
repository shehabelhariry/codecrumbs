import React from "react"
import Footer from "../components/footer"
import Header from "../components/Header"

import "../styles/index.scss"
import LayoutStyles from "./Layout.module.scss"

const Layout = props => {
  return (
    <div className={LayoutStyles.container}>
      <div className={LayoutStyles.contentContainer}>
        <Header />
        {props.children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
