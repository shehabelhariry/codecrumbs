import React from "react"
import Layout from "../components/Layout"
import axios from "axios"
import Button from "../components/Button/Button"
import styles from "./contact.module.scss"
import CustomInput from "../components/CustomInput/CustomInput"
import TeamMember from "../components/TeamMember/TeamMember"

const ContactPage = () => {
  return (
    <Layout noContactButton={true}>
      {() => {
        return (
          <div className="width-container">
            <div className={styles.container}>
              <TeamMember
                name="Shehab Elhariry"
                about="Front-end Developer - (1/8) Piano Player - Comet"
                linkedIn="https://www.linkedin.com/in/shehabelhariry/"
                twitter="https://twitter.com/cheha6"
                github="https://github.com/shehabelhariry"
              />
              <div className={styles.contactFormContainer}>
                <p style={{ fontSize: "1.5rem", paddingBottom: "20px" }}>
                  Drop me a word
                </p>
                <form
                  className={styles.contactForm}
                  data-netlify="true"
                  name="Contact Form"
                  method="post"
                  action="thank-you"
                >
                  <input type="hidden" name="form-name" value="Contact Form" />
                  <CustomInput required name="subject" placeholder="Subject" />
                  <CustomInput
                    required
                    name="email"
                    placeholder="Email"
                    type="email"
                  />
                  <CustomInput
                    required
                    name="message"
                    type="textarea"
                    placeholder="Message"
                  />
                  <Button appearance="primary">Submit</Button>
                </form>
              </div>
            </div>
          </div>
        )
      }}
    </Layout>
  )
}

export default ContactPage
