import React, { useState, useEffect } from "react"
import heroStyles from "./Hero.module.scss"
import Typist from "react-typist"
import "react-typist/dist/Typist.css"
import { animated, useSpring } from "react-spring"
import CopyableCodeSnippet from "../CopyableCodeSnippet/CopyableCodeSnippet"
import doneIcon from "../../images/success.png"

const codeValue = `const CodeCrumb = () => {
  const howManyMinutes = 2
  return (
    <div>
      <h1>Learn bits of code daily </h1>
      <span>less than {howManyMinutes} reading</span>
    </div>
  )
}
export default CodeCrumb`

const Hero = () => {
  const [contentIsShown, setContentDisplay] = useState(false)
  const [codeIsClicked, setCodeIsClicked] = useState(false)
  const [done, setDone] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setContentDisplay(true)
      setCodeIsClicked(true)
    }, 600)
    setTimeout(() => {
      setDone(true)
    }, 12200)
  }, [])
  const contentProps = useSpring({
    opacity: contentIsShown ? 1 : 0,
    // marginTop: contentIsShown ? 0 : -1000,
  })
  const initialCodePun = useSpring({
    opacity: 1,
    // marginTop: contentIsShown ? 0 : -1000,
  })
  const clickedCodePun = useSpring({
    // transform: `translateX(${howClose}px)`,
    // marginTop: contentIsShown ? 0 : -1000,
  })

  const notDoneStyles = useSpring({
    transform: `rotate(${done ? 0 : -40}deg)`,
    opacity: `${done ? 1 : 0}`,
  })

  return (
    <div className={heroStyles.container}>
      <div className={heroStyles.description}>
        <h1>
          What is <i className={heroStyles.underlined}>code-related</i>, longer
          than<i> a tweet</i> but shorter than a blog post ?
          <h1 className={heroStyles.questionAnswer} style={contentProps}>
            <Typist>
              <Typist.Delay ms={1200} />
              Milk?
              <Typist.Backspace count={10} delay={1200} />
              A Gohst?
              <Typist.Backspace count={20} delay={1200} />
              Dan's Github bio?
              <Typist.Backspace count={20} delay={1200} />a Codecrumb
            </Typist>
            <animated.img
              className={heroStyles.doneIcon}
              src={doneIcon}
              alt="done"
              style={notDoneStyles}
            />
          </h1>
        </h1>
        {/*    <Button as="link" href="/blog">
        Learn more
      </Button>*/}
      </div>
      <animated.div
        className={heroStyles.codePun}
        style={codeIsClicked ? clickedCodePun : initialCodePun}
      >
        <CopyableCodeSnippet
          codeType="javascript"
          codeStyle={{
            backgroundColor: "#343434",
            color: "white",
            fontSize: "18px",
            maxWidth: "94vw",
            overflow: "auto",
            borderRadius: "8px",
          }}
          codeValue={codeValue}
          codeLanguage={"javascript"}
        />
      </animated.div>
    </div>
  )
}

export default Hero
