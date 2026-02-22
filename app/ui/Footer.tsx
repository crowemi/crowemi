'use client';

import { Github, Linkedin, Mail, Threads, Twitter } from 'iconoir-react';
import { useState } from 'react';

import { subscribe } from '../lib/newsletter';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const result = await subscribe(email);
    setIsSubmitting(false);

    if (!result.success) {
      setError('error' in result ? result.error : 'Unable to subscribe right now.');
      return;
    }

    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) {
                    setError('');
                  }
                }}
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
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
                <Threads className="h-5 w-5" />
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
