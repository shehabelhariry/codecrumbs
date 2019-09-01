import React from "react"
import Layout from "../components/Layout"

const ContactPage = () => {
  return (
    <Layout>
      <div className="width-container">
        <h1 className="page-title">Contact</h1>
        <p>Drop me a word</p>
        <form
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
        </form>
      </div>
    </Layout>
  )
}

export default ContactPage
