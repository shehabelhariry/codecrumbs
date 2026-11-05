import type { Metadata } from "next"
import PostHeader from "@/components/PostHeader/PostHeader"
import ShareLinks from "@/components/ShareLinks/ShareLinks"
import { absoluteUrl } from "@/lib/paths"
import { getPost, getPosts } from "@/lib/posts"
import { site } from "@/lib/site"
import styles from "./page.module.scss"

export const dynamicParams = false

type PostPageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPost((await params).slug)
  const url = absoluteUrl(`/blog/${post.slug}/`)
  return {
    title: `${post.title} · ${site.name}`,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      siteName: site.name,
      type: "article",
      url,
      images: [site.socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      creator: `@${site.twitter}`,
      images: [site.socialImage],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost((await params).slug)
  const { Content } = post

  return (
    <div className="container">
      <article className={styles.article}>
        <PostHeader post={post} />
        <div className={styles.body}>
          <Content />
        </div>
        <ShareLinks post={post} />
      </article>
    </div>
  )
}
