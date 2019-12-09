import React from "react"
import Layout from "../components/Layout"
import Hero from "../components/Hero/Hero"
import { Helmet } from "react-helmet"
import Logo from "../images/logo.png"

const IndexPage = () => {
  return (
    <Layout>
      {isDark => {
        return (
          <React.Fragment>
            <Helmet>
              <meta
                property="og:image"
                content={`https://codecrumbs.netlify.com${Logo}`}
              />
              <title>Codecrumbs</title>
            </Helmet>
            <Hero isDark={isDark} />
          </React.Fragment>
        )
      }}
    </Layout>
  )
}

export default IndexPage
