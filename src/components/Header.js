import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import headerStyles from "./Header.module.scss"

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

  // console.log(data)

  return (
    <header className={headerStyles.header}>
      <h1>
        <Link className={headerStyles.title} to="/">
          {siteInfo.site.siteMetadata.title}
        </Link>
      </h1>
      <nav className={headerStyles.navigation}>
        <ul>
          <li>
            <Link
              className={headerStyles.link}
              to="/"
              activeClassName={headerStyles.activeLink}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={headerStyles.link}
              to="/contact"
              activeClassName={headerStyles.activeLink}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              className={headerStyles.link}
              to="/blog"
              activeClassName={headerStyles.activeLink}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              className={headerStyles.link}
              to="/about"
              activeClassName={headerStyles.activeLink}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
