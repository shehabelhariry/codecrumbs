import { absoluteUrl } from "@/lib/paths"
import type { Post } from "@/lib/posts"
import { site } from "@/lib/site"
import styles from "./ShareLinks.module.scss"

type ShareLinksProps = { post: Pick<Post, "slug" | "title"> }

export default function ShareLinks({ post }: ShareLinksProps) {
  const url = encodeURIComponent(absoluteUrl(`/blog/${post.slug}/`))
  const title = encodeURIComponent(post.title)
  const links = [
    {
      name: "X",
      href: `https://x.com/intent/tweet?text=${title}&url=${url}&via=${site.twitter}`,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
  ]

  return (
    <aside className={styles.share}>
      <span>Share on</span>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.name}
        </a>
      ))}
    </aside>
  )
}
