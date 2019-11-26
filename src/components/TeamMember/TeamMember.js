import React from "react"
import "./team-member.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTwitterSquare,
  faLinkedin,
  faGithubSquare,
} from "@fortawesome/free-brands-svg-icons"

import profileImage from "../../images/me.jpeg"

const TeamMember = ({ name, about, twitter, linkedIn, github }) => {
  return (
    <div className="team-member">
      <div
        className="team-member__image-container"
        style={{ backgroundImage: `url(${profileImage})` }}
      />
      <h3>{name}</h3>
      <p>{about}</p>
      <div className="team-member__icons">
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
