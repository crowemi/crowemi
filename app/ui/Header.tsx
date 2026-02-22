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
          <p className="mt-2 max-w-2xl text-gray-600">
            Aspiring writer, engineer, and builder. Exploring faith, code, data, and the
            digital frontier.
          </p>

        </div>
      </div>
    </header>
  );
}
