import React from "react"
import Layout from "../components/Layout"
import TeamMember from "../components/TeamMember/TeamMember"

const About = () => {
  return (
    <Layout>
      <div className="width-container">
        <h1 className="page-title">Team/contributors</h1>
        <TeamMember
          avatarProps={{
            avatarStyle: "Circle",
            topType: "ShortHairShortFlat",
            accessoriesType: "Prescription02",
            hairColor: "BrownDark",
            facialHairType: "Blank",
            clotheType: "CollarSweater",
            clotheColor: "Blue03",
            eyeType: "Default",
            eyebrowType: "Default",
            mouthType: "Default",
            skinColor: "Light",
          }}
          name="Shehab Elhariry"
          about="Front-end Developer - (1/8) Piano Player - Comet"
          linkedIn="https://www.linkedin.com/in/shehabelhariry/"
          twitter="https://twitter.com/cheha6"
          github="https://github.com/shehabelhariry"
        />
      </div>
    </Layout>
  )
}

export default About
