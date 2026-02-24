import { getBlogPosts } from "../lib/blog";
import BlogCard from "./BlogCard";
import Footer from "./Footer";
import Header from "./Header";

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
