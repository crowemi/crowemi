'use client';

import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Newsletter Section */}
          <div>
            <h3 className="mb-4">Subscribe to my newsletter</h3>
            <p className="mb-4 text-gray-600">
              Get the latest posts delivered right to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 text-sm text-green-600">
                Thanks for subscribing!
              </p>
            )}
          </div>

          {/* Social Links Section */}
          <div className="flex flex-col items-start md:items-end">
            <h3 className="mb-4">Connect with me</h3>
            <div className="flex gap-4">
              <a
                href="https://x.com/realCrowemi"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-100 p-3 text-gray-600 transition-colors hover:bg-blue-100 hover:text-blue-600"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.threads.com/@crowemi"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-100 p-3 text-gray-600 transition-colors hover:bg-black hover:text-white"
                aria-label="Threads"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.143 12.328c-.114-.057-.228-.114-.343-.143.2-.971.257-2.114-.057-3.257-.343-1.229-1.029-2.257-2-2.971-1.114-.829-2.6-1.257-4.4-1.257-3.457 0-5.771 2.143-5.857 5.314h2.314c.114-1.857 1.429-3.057 3.571-3.057 2.286 0 3.571 1.143 3.914 3.086.143.743.114 1.486-.029 2.114-.686-.114-1.429-.143-2.2-.114-2.714.114-4.6 1.4-4.6 3.486 0 2.029 1.629 3.371 4.114 3.371 1.914 0 3.229-.743 4-2.229.314-.6.514-1.314.6-2.114.4.143.8.314 1.143.6.429.343.629.8.629 1.4 0 1.286-1.143 2.229-2.571 2.229h-5.029v2.229h5.029c2.714 0 4.886-1.857 4.886-4.457 0-1.343-.543-2.4-1.6-3.143zm-6.857 4.4c-1.143 0-1.8-.514-1.8-1.286 0-.857.8-1.4 2.286-1.486.6-.029 1.171 0 1.714.086-.257 1.629-1.143 2.686-2.2 2.686z" />
                </svg>
              </a>
              <a
                href="https://github.com/crowemi"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-100 p-3 text-gray-600 transition-colors hover:bg-gray-800 hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/crowemi/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-100 p-3 text-gray-600 transition-colors hover:bg-blue-600 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@crowemi.com"
                className="rounded-full bg-gray-100 p-3 text-gray-600 transition-colors hover:bg-red-100 hover:text-red-600"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Crowemi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
