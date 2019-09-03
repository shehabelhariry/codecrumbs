import React from "react"
import heroStyles from "./Hero.module.scss"
import Button from "../Button/Button"
import Typist from "react-typist"
import "react-typist/dist/Typist.css"
import Img from "gatsby-image"

import { graphql } from "gatsby"

const img1 = require("../../pages/5.png")
const img2 = require("../../pages/1.png")
const Hero = () => {
  return (
    <div className={heroStyles.container}>
      <div className={heroStyles.description}>
        <h1>
          Your Development success is <br />
          one
          <Typist>
            <Typist.Delay ms={1200} />
            breadcrumb
            <Typist.Backspace count={10} delay={1200} />
            codecrumb
          </Typist>
          away
        </h1>
        <p>
          Learn JS and CSS code tips and tricks from our <br /> collection of
          awesome code/crumbs
        </p>
        <Button as="link" href="/blog">
          Learn more
        </Button>
      </div>
      <div className={heroStyles.imagesParalex}>
        <img src={img1} />  
      </div>
    </div>
  )
}

export default Hero
