import Link from "next/link"
import PostList from "@/components/PostList/PostList"
import { withBasePath } from "@/lib/paths"
import { getPosts } from "@/lib/posts"
import styles from "./page.module.scss"

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <div className="container">
      <section className={styles.intro}>
        <h1>In the search for diamond we found gold (or did we?)</h1>
      </section>
      <section className={styles.about} aria-label="About me">
        <div>
          <p>
            I am <Link href="/about/">Shehab</Link>, a man in his mid-30s trying
            to find out what to be when I grow up. Along the way, I worked 10
            years in tech, moved countries, and learned a lot about life the
            easy and hard way.
          </p>
          <p>
            What a World! or <span className={styles.waw}>[waw]</span> for
            short. I have been finding myself saying it a lot in the past couple
            of months. Sometimes in awe and amazement, but other times in sheer
            surprise and disbelief.
          </p>
          <Link className={styles.more} href="/blog/what-a-world/">
            Read the full story <span aria-hidden="true">→</span>
          </Link>
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
