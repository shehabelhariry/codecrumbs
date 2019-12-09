import React from "react"
import Button from "../Button/Button"
import "./SubscribeButton.scss"

const SubscribeButton = () => {
  return (
    <div className="subscribe-button">
      <input
        placeholder="Never miss a crumb !"
        type="email"
        name="EMAIL"
        id="mce-EMAIL"
        placeholder="Type Your Email adress"
        required={true}
      />
      <Button
        type="submit"
        type="submit"
        value="Subscribe"
        name="subscribe"
        id="mc-embedded-subscribe"
        className="button"
      >
        Subscribe
      </Button>
    </div>
  )
}

export default SubscribeButton
