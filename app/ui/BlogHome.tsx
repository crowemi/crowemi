import dynamic from "next/dynamic";

import { getBlogPosts } from "../lib/blog";
import Footer from "./Footer";
import Header from "./Header";

const BlogCard = dynamic(() => import("./BlogCard"), {
  loading: () => (
    <div className="animate-pulse overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="aspect-[16/9] bg-gray-200" />
      <div className="p-6">
        <div className="mb-2 h-4 w-1/2 rounded bg-gray-200" />
        <div className="mb-3 h-6 w-3/4 rounded bg-gray-200" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  ),
});

export default async function BlogHome() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8">Latest Posts</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              title={post.title}
              author={post.author}
              date={post.date}
              blurb={post.blurb}
              image={post.image}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
