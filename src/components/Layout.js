import React from "react"
import Footer from "../components/footer"
import Header from "../components/Header"
import PageTransition from "gatsby-plugin-page-transitions"

import "../styles/index.scss"
import LayoutStyles from "./Layout.module.scss"

const Layout = props => {
  return (
    <PageTransition>
      <div className={LayoutStyles.container}>
        <div className={LayoutStyles.contentContainer}>
          <Header />
          {props.children}
        </div>
        <Footer />
      </div>
    </PageTransition>
  )
}

export default Layout
