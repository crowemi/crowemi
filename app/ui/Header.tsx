export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1771050889377-b68415885c64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdmF0YXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzE0NjczNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover ring-4 ring-gray-100"
          />
          <h1 className="mt-4">Andy Crowe</h1>
          <p className="mt-2 max-w-2xl text-gray-600">
            Writer, developer, and creator. Exploring code, creativity, and the
            digital frontier. Welcome to my corner of the internet where I share
            ideas and stories.
          </p>
        </div>
      </div>
    </header>
  );
}
