import { absoluteUrl } from "@/lib/paths"
import { site } from "@/lib/site"
import styles from "./ShareLinks.module.scss"

export default function ShareLinks({ post }) {
  const url = encodeURIComponent(absoluteUrl(`/blog/${post.slug}/`))
  const title = encodeURIComponent(post.title)
  const links = [
    {
      label: "f",
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      label: "X",
      name: "X (Twitter)",
      href: `https://x.com/intent/tweet?text=${title}&url=${url}&via=${site.twitter}`,
    },
    {
      label: "in",
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
  ]

  return (
    <aside className={styles.share}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.name}`}
          className={styles.link}
        >
          {link.label}
        </a>
      ))}
    </aside>
  )
}
