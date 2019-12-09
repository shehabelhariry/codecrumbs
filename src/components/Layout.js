import React, { useState, useEffect } from "react"
import Footer from "../components/footer"
import Header from "../components/Header"
import SubscribeButton from "../components/SubscribeButton/SubscribeButton"

import "../styles/index.scss"
import LayoutStyles from "./Layout.module.scss"
import Button from "./Button/Button"
import CustomInput from "./CustomInput/CustomInput"

const MailChimp = (
  <div>
    <link
      href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css"
      rel="stylesheet"
      type="text/css"
    />
    <div id="mc_embed_signup">
      <form
        action="https://netlify.us4.list-manage.com/subscribe/post?u=00df214eb4af39941cd2da674&amp;id=57e40dd829"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        target="_blank"
        noValidate
      >
        <div id="mc_embed_signup_scroll">
          <SubscribeButton />
          <div
            style={{ position: "absolute", left: "-5000px" }}
            aria-hidden="true"
          >
            <input
              type="text"
              name="b_00df214eb4af39941cd2da674_57e40dd829"
              tabIndex="-1"
              value=""
            />
          </div>
        </div>
      </form>
    </div>
  </div>
)

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          border: "1px solid #36c7bb",
          padding: "20px",
          width: "50%",
          margin: "0 auto",
          // borderRadius: "600px",
        }}
      >
        <p>Never Miss a Codecrumb!</p>
        {MailChimp}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
