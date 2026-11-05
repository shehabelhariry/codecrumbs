import PostHeader from "@/components/PostHeader/PostHeader"
import PostPreview from "@/components/PostPreview/PostPreview"
import { getPosts } from "@/lib/posts"
import styles from "./page.module.scss"

export default async function HomePage() {
  const [featured, ...rest] = await getPosts()

  return (
    <>
      <PostHeader post={featured} featured />
      <div className={styles.posts}>
        {rest.map((post) => (
          <PostPreview key={post.slug} post={post} />
        ))}
      </div>
    </>
  )
}
