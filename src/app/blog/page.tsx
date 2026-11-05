import type { Metadata } from "next"
import PostList from "@/components/PostList/PostList"
import { getPosts } from "@/lib/posts"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: `All posts · ${site.name}`,
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="container">
      <h1>All posts</h1>
      <PostList posts={posts} />
    </div>
  )
}
