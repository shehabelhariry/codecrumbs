import PostHeader from "@/components/PostHeader/PostHeader"
import ShareLinks from "@/components/ShareLinks/ShareLinks"
import { absoluteUrl } from "@/lib/paths"
import { getPost, getPosts } from "@/lib/posts"
import { site } from "@/lib/site"
import styles from "./page.module.scss"

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const post = await getPost((await params).slug)
  const image = post.socialImage && absoluteUrl(post.socialImage)
  return {
    title: `${site.name}: ${post.title}`,
    openGraph: {
      title: post.title,
      siteName: site.name,
      type: "article",
      url: absoluteUrl(`/blog/${post.slug}/`),
      images: image && [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      creator: `@${site.twitter}`,
      images: image && [image],
    },
  }
}

export default async function PostPage({ params }) {
  const post = await getPost((await params).slug)
  const { Content } = post

  return (
    <article>
      <PostHeader post={post} />
      <div className={styles.wrapper}>
        <ShareLinks post={post} />
        <div className={styles.body}>
          <Content />
        </div>
      </div>
    </article>
  )
}
