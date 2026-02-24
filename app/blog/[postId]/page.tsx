import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "iconoir-react";

import { getBlogPost } from "../../lib/blog";
import Footer from "../../ui/Footer";

export const dynamic = "force-dynamic";
import Header from "../../ui/Header";

interface BlogPostPageProps {
  params: {
    postId: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4">Post Not Found</h1>
            <p className="mb-8 text-gray-600">
              The blog post you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all posts
        </Link>

        <div className="mb-8 overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="aspect-[21/9] w-full object-cover"
          />
        </div>

        <article className="max-w-none">
          <h1 className="mb-6">{post.title}</h1>

          <div className="mb-8 flex flex-wrap items-center gap-6 border-y border-gray-200 py-6">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{post.date}</time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div
            className="space-y-4 [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:text-lg [&_h3]:font-medium [&_li]:leading-relaxed [&_p]:leading-relaxed [&_ul]:my-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_details]:my-4 [&_summary]:cursor-pointer [&_summary]:font-medium"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-600">
            Enjoyed this article? Share it with others or{" "}
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              read more posts
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
