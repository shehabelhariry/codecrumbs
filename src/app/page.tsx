import PostList from "@/components/PostList/PostList"
import { getPosts } from "@/lib/posts"
import { site } from "@/lib/site"
import styles from "./page.module.scss"

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <div className="container">
      <p className={styles.intro}>{site.description}.</p>
      <PostList posts={posts} />
    </div>
  )
}
