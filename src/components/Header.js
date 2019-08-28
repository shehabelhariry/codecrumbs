import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Button from "./Button/Button"
import headerStyles from "./Header.module.scss"
import Link from "gatsby-plugin-transition-link/AniLink"

const Header = () => {
  const siteInfo = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.navigation}>
        <h1>
          <Link className={headerStyles.title} paintDrip hex="#36c7bb" to="/">
            {siteInfo.site.siteMetadata.title}
          </Link>
        </h1>
        <ul>
          <li>
            <Link
              className={headerStyles.link}
              paintDrip
              hex="#36c7bb"
              to="/our-work"
              activeClassName={headerStyles.activeLink}
            >
              Our Work
            </Link>
          </li>
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
          <li>
            <Link
              className={headerStyles.link}
              paintDrip
              hex="#36c7bb"
              to="/about"
              activeClassName={headerStyles.activeLink}
            >
              About
            </Link>
          </li>
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
