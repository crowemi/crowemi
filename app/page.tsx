import Image from "next/image";
import BlogPreview from "./ui/BlogPreview";
import Footer from "./ui/Footer";

const blogPosts = [
  {
    id: 1,
    title: "The Art of Clean Code",
    createdDate: "2023-10-24",
    author: "Scooter",
    content: "Clean code is not just about following rules; it's about communicating intent. When we write code that is easy to read and understand, we are respecting our future selves and our colleagues. In this post, we explore the principles of clean code and how to apply them in your daily work."
  },
  {
    id: 2,
    title: "Navigating the Cloud",
    createdDate: "2023-11-15",
    author: "Crowemi",
    content: "Cloud computing has revolutionized the way we build and deploy applications. From serverless functions to managed databases, the cloud offers a plethora of tools to scale your business. Join us as we dive deep into the services offered by major cloud providers and how to leverage them effectively."
  },
  {
    id: 3,
    title: "Designing for the User",
    createdDate: "2023-12-05",
    author: "Scooter",
    content: "User experience is at the heart of every successful product. Understanding your users' needs and behaviors is crucial for designing intuitive and engaging interfaces. We'll discuss user-centered design methodologies and share tips on creating delightful experiences that keep users coming back for more."
  }
];

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] dark:bg-gray-900">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-4">
            Welcome to <span className="text-indigo-600 dark:text-indigo-400">Crowemi</span>
          </h1>
          <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
            Exploring code, creativity, and the digital frontier.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 w-full place-items-center">
          {blogPosts.map((post) => (
            <BlogPreview 
              key={post.id}
              title={post.title}
              createdDate={post.createdDate}
              author={post.author}
              content={post.content}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}