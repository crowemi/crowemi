import React from 'react';

interface BlogPreviewProps {
  title: string;
  createdDate: string;
  author: string;
  content: string;
  blurbLength?: number;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ 
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
    <div className="group relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:bg-gray-800">
      {/* Decorative gradient blob */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 blur-3xl opacity-20 transition-all duration-500 group-hover:scale-150 group-hover:opacity-30"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 text-sm font-medium text-gray-500 dark:text-gray-400">
          <time dateTime={createdDate} className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
            </svg>
            {new Date(createdDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          <span>•</span>
          <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
            </svg>
            {author}
          </span>
        </div>

        <h3 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          <a href="#" className="bg-gradient-to-r from-gray-900 to-gray-700 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-300 hover:bg-[length:100%_2px] dark:from-white dark:to-gray-300">
            {title}
          </a>
        </h3>

        <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
          {blurb}
        </p>

        <div className="mt-6 flex items-center gap-2">
          <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Read article
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform group-hover:translate-x-1">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;