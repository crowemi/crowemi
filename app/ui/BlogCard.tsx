interface BlogCardProps {
  title: string;
  author: string;
  date: string;
  blurb: string;
  image: string;
}

export default function BlogCard({ title, author, date, blurb, image }: BlogCardProps) {
  return (
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
          <span>•</span>
          <time dateTime={date}>{date}</time>
        </div>
        <h2 className="mb-3 transition-colors group-hover:text-blue-600">
          {title}
        </h2>
        <p className="text-gray-600 line-clamp-3">
          {blurb}
        </p>
      </div>
    </article>
  );
}