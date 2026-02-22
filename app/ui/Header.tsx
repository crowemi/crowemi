export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avatar.jpg"
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover ring-4 ring-gray-100"
          />
          <h1 className="mt-4">Andy Crowe</h1>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700 ring-1 ring-gray-200">
            <span>Believer</span>
            <span className="text-gray-400">•</span>
            <span>Builder</span>
            <span className="text-gray-400">•</span>
            <span>Writer</span>
          </p>
          <p className="mt-10 max-w-2xl text-gray-600">Exploring faith, code, data, and the
            digital frontier.
          </p>

        </div>
      </div>
    </header>
  );
}
