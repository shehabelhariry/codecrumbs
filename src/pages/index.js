import React from "react"
import Layout from "../components/Layout"
import Hero from "../components/Hero/Hero"
import { Helmet } from "react-helmet"
import Logo from "../images/logo.png"

const IndexPage = () => {
  return (
    <Layout>
      <Helmet>
        <meta
          property="og:image"
          content={`https://codecrumbs.netlify.com${Logo}`}
        />
      </Helmet>
      <Hero />
    </Layout>
  )
}

export default IndexPage
