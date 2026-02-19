import BlogCard from "./ui/BlogCard";
import Footer from "./ui/Footer";
import Header from "./ui/Header";

const blogPosts = [
  {
    id: 1,
    title: "Building a Modern Workspace: Tools and Tips for Productivity",
    author: "Crowemi",
    date: "February 15, 2026",
    blurb: "Discover the essential tools and strategies I use to create an efficient and inspiring workspace. From desk setup to digital tools, learn how to optimize your environment for maximum productivity and creativity.",
    image: "https://images.unsplash.com/photo-1621743018966-29194999d736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc3MTQ3NDY3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "The Art of Mindful Work: Finding Balance in the Digital Age",
    author: "Crowemi",
    date: "February 10, 2026",
    blurb: "In our always-connected world, finding balance is more important than ever. Explore techniques for mindful work, including how to disconnect, set boundaries, and create space for deep thinking and creativity.",
    image: "https://images.unsplash.com/photo-1650735311937-1876825e971b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBsYXB0b3AlMjBub3RlYm9va3xlbnwxfHx8fDE3NzE0NzgxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Lessons from Nature: How Natural Patterns Inspire Design",
    author: "Scooter",
    date: "February 5, 2026",
    blurb: "Nature has been the greatest designer for billions of years. Learn how natural patterns, from fractals to the golden ratio, can inform and enhance our approach to digital design and user experience.",
    image: "https://images.unsplash.com/photo-1600257729950-13a634d32697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGUlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzcxNDc0NTcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

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