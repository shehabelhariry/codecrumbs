import React, { useState } from "react"
import Avatar from "avataaars"
import "./team-member.scss"

import LinkedInImage from "../../images/social-linkedin-circular-button.svg"
import GithubImage from "../../images/github.svg"
import twitterImg from "../../images/twitter.svg"

const TeamMember = ({
  name,
  avatarProps,
  about,
  twitter,
  linkedIn,
  github,
}) => {
  const [eyeBrows, setEyeBrows] = useState("Default")
  const [mouth, setMouth] = useState("Default")
  const changeExpression = () => {
    if (eyeBrows === "Default") {
      setEyeBrows("RaisedExcited")
      setMouth("Smile")
    } else {
      setEyeBrows("Default")
      setMouth("Default")
    }
  }
  return (
    <div className="team-member">
      <Avatar {...avatarProps} eyebrowType={eyeBrows} mouthType={mouth} />
      <h3>{name}</h3>
      <p>{about}</p>
      <div
        className="team-member__icons"
        onMouseEnter={changeExpression}
        onMouseLeave={changeExpression}
      >
        <a href={linkedIn}>
          <img src={LinkedInImage} alt="social media" />
        </a>
        <a href={github}>
          <img src={GithubImage} alt="social media" />
        </a>
        <a href={twitter}>
          <img src={twitterImg} alt="social media" />
        </a>
      </div>
    </div>
  )
}

export default TeamMember
