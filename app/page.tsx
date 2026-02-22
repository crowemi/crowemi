import BlogCard from "./ui/BlogCard";
import Footer from "./ui/Footer";
import Header from "./ui/Header";
import { blogPosts } from "./data/blogPosts";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8">Latest Posts</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
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