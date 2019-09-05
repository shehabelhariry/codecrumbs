import React from "react"
import Link from "gatsby-plugin-transition-link/AniLink"
import buttonStyles from "./Button.module.scss"

const Button = originalButtonProps => {
  const { children, as = "button", href } = originalButtonProps
  const CustomTag = as
  const ButtonComponent = props => {
    if (as === "link") {
      return (
        <Link to={href} {...props} hex="#36c7bb" paintDrip>
          <span className={buttonStyles.codeCrumbsButtonTextSpan}>
            {children}
          </span>
        </Link>
      )
    }
    return (
      <CustomTag {...props}>
        <span className={buttonStyles.codeCrumbsButtonTextSpan}>
          {children}
        </span>
      </CustomTag>
    )
  }
  return (
    <ButtonComponent
      {...originalButtonProps}
      className={buttonStyles.codeCrumbsButton}
    />
  )
}

export default Button
