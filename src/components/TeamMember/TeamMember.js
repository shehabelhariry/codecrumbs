import React, { useState } from "react"
import Avatar from "avataaars"
import "./team-member.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookSquare,
  faTwitterSquare,
  faLinkedin,
  faGithubSquare,
} from "@fortawesome/free-brands-svg-icons"

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
        <a href={linkedIn} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon size="2x" icon={faLinkedin} />
        </a>
        <a target="_blank" rel="noopener noreferrer" href={github}>
          <FontAwesomeIcon size="2x" icon={faGithubSquare} />
        </a>
        <a href={twitter} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon size="2x" icon={faTwitterSquare} />
        </a>
      </div>
    </div>
  )
}

export default TeamMember
