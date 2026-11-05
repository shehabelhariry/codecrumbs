import PostList from "@/components/PostList/PostList"
import { withBasePath } from "@/lib/paths"
import { getPosts } from "@/lib/posts"
import styles from "./page.module.scss"

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <div className="container">
      <section className={styles.intro}>
        <h1>In the search for diamond we found gold (or did we)</h1>
      </section>
      <section className={styles.about} aria-labelledby="about">
        <div>
          <h2 id="about" className={styles.sectionTitle}>
            About me
          </h2>
          <p>
            I am Shehab a mid 30&apos;s man trying to find out what he would be
            when he grows up. On the way, worked 10 years in tech. Moved
            countries and learned a lot about life the easy and hard way.
          </p>
        </div>
        <figure className={styles.stamp}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/images/shehab.jpg")}
            alt="Shehab smiling in round glasses under a blue sky"
            width={600}
            height={800}
          />
        </figure>
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
