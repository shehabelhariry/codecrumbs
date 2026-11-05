import PostList from "@/components/PostList/PostList"
import { getPosts } from "@/lib/posts"
import { site } from "@/lib/site"
import styles from "./page.module.scss"

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <div className="container">
      <section className={styles.intro}>
        <h1>Hello, world.</h1>
        <p>{site.description}</p>
      </section>
      <section aria-labelledby="recent-writing">
        <h2 id="recent-writing" className={styles.sectionTitle}>
          Recent writing
        </h2>
        <PostList posts={posts} />
      </section>
    </div>
  )
}
