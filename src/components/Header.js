import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Button from "./Button/Button"
import headerStyles from "./Header.module.scss"
import Link from "gatsby-plugin-transition-link/AniLink"
import "hamburgers/dist/hamburgers.css"

const Header = () => {
  const [menuIsOpen, setMenuOpen] = useState(false)
  const siteInfo = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const toggleNavigation = () => {
    console.log(menuIsOpen)
    setMenuOpen(!menuIsOpen)
  }

  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.navigation}>
        <h1>
          <Link className={headerStyles.title} paintDrip hex="#36c7bb" to="/">
            {siteInfo.site.siteMetadata.title}
          </Link>
        </h1>
        <div className={headerStyles.burgerMenu}>
          <button
            style={{ outline: "none", cursor: "pointer" }}
            className={`hamburger hamburger--emphatic ${
              menuIsOpen ? "is-active" : ""
            }`}
            type="button"
            onClick={toggleNavigation}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
        <ul className={menuIsOpen ? headerStyles.fullScreen : null}>
          {/* <li>
            <Link
              className={headerStyles.link}
              paintDrip
              hex="#36c7bb"
              to="/our-work"
              activeClassName={headerStyles.activeLink}
            >
              Our Work
            </Link>
          </li> */}
          <li>
            <Link
              className={headerStyles.link}
              paintDrip
              hex="#36c7bb"
              to="/blog"
              activeClassName={headerStyles.activeLink}
            >
              Crumbs
            </Link>
          </li>
          {/* <li>
            <Link
              className={headerStyles.link}
              paintDrip
              hex="#36c7bb"
              to="/about"
              activeClassName={headerStyles.activeLink}
            >
              Team
            </Link>
          </li> */}
          <li>
            <Button href="/contact" as="link">
              Say Hi
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
