import React from 'react';

interface BlogPreviewProps {
  title: string;
  createdDate: string;
  author: string;
  content: string;
  blurbLength?: number;
}

const BlogCard: React.FC<BlogPreviewProps> = ({ 
  title, 
  createdDate, 
  author, 
  content, 
  blurbLength = 20 
}) => {
  // Generate blurb from content
  const getBlurb = (text: string, length: number) => {
    const words = text.split(' ');
    if (words.length <= length) return text;
    return words.slice(0, length).join(' ') + '...';
  };

  const blurb = getBlurb(content, blurbLength);

  return (
    <div className="group w-full max-w-2xl border-b border-carafe/40 pb-8">
      <div className="flex items-center gap-2 text-sm text-khaki">
        <time dateTime={createdDate}>
          {new Date(createdDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
        </time>
        <span>&middot;</span>
        <span>{author}</span>
      </div>

      <h3 className="mt-2 text-xl font-semibold tracking-tight text-cream sm:text-2xl">
        <a href="#" className="hover:text-khaki transition-colors">
          {title}
        </a>
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-khaki/80">
        {blurb}
      </p>

      <a href="#" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-khaki hover:text-cream transition-colors">
        Read more
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform group-hover:translate-x-0.5">
          <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
        </svg>
      </a>
    </div>
  );
};

export default BlogCard;