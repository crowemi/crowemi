"use client";

import { useState } from "react";
import Link from "next/link";

interface BlogCardProps {
  id: string;
  title: string;
  author: string;
  date: string;
  blurb: string;
  image: string;
}

export default function BlogCard({
  id,
  title,
  author,
  date,
  blurb,
  image,
}: BlogCardProps) {
  const [loading, setLoading] = useState(false);

  return (
    <Link href={`/blog/${id}`} className="block" onClick={() => setLoading(true)}>
      <article className="group cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg">
        <div className="aspect-[16/9] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
            <span>{author}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            <time dateTime={date}>{date}</time>
          </div>
          <h2 className="mb-3 transition-colors group-hover:text-blue-600">
            {title}
          </h2>
          <p className="line-clamp-3 text-gray-600">{blurb}</p>
          <div className="mt-4 flex w-full items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors group-hover:bg-blue-700">
            {loading ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading
              </>
            ) : (
              "Read More"
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}