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
      <section className={styles.about} aria-label="About me">
        <div>
          <p>
            I am Shehab a man in his mid 30&apos;s trying to find out what he
            would be when he grows up. On the way, worked 10 years in tech.
            Moved countries and learned a lot about life the easy and hard way.
          </p>
          <p>
            I have been finding myself saying what a world a lot in the past
            couple of months. Sometimes in awe and amazment but other times in
            sheer surprise.
          </p>
          <p>
            I created this blog based on an old website of mine. the old one I
            created in 2 months this one in 2 hours.{" "}
            <span className={styles.waw}>[waw].</span>
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
