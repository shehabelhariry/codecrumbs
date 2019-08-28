import React from "react"
import { Link } from "gatsby"
import buttonStyles from "./Button.module.scss"

const Button = ({ children, as = "button", href }) => {
  const ButtonComponent = props => {
    return as === "button" ? (
      <button {...props}>
        <span className={buttonStyles.codeCrumbsButtonTextSpan}>
          {children}
        </span>
      </button>
    ) : (
      <Link to={href} {...props}>
        <span className={buttonStyles.codeCrumbsButtonTextSpan}>
          {children}
        </span>
      </Link>
    )
  }
  return <ButtonComponent className={buttonStyles.codeCrumbsButton} />
}

export default Button