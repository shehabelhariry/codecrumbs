import React from "react"
import Layout from "../components/Layout"
import axios from "axios"
import Button from "../components/Button/Button"
import styles from "./contact.module.scss"
import CustomInput from "../components/CustomInput/CustomInput"
import TeamMember from "../components/TeamMember/TeamMember"

const ContactPage = () => {
  const hitLambda = () => {
    axios.post("http://localhost.com:9000/getUsers").then(resp => {
      console.log(resp)
    })
  }
  return (
    <Layout>
      <div className="width-container">
        <div className={styles.container}>
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
          <form
            className={styles.contactForm}
            data-netlify="true"
            name="contact"
            method="POST"
          >
            <CustomInput name="subject" label="Subject" />
            <CustomInput name="message" type="textarea" label="Message" />
            <Button>Submit</Button>
          </form>
        </div>
        {/* <form
          name="contact"
          method="POST"
          data-netlify="true"
          action="/success"
        >
          <div className="form-group">
            <label for="subject">Subject</label>
            <input name="subject" />
          </div>
          <div className="form-group">
            <label for="message">Message</label>
            <textarea name="subject" />
          </div>
          <p>
            <button type="submit">Send</button>
          </p>
        </form> */}
      </div>
    </Layout>
  )
}

export default ContactPage
