import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          
          {/* Brand & Socials */}
          <div className="flex flex-col items-center gap-6 md:items-start">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Crowemi
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs text-center md:text-left">
              Exploring code, creativity, and the digital frontier. Join us on our journey.
            </p>
            <div className="flex gap-4">
              {/* X (Twitter) */}
              <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <span className="sr-only">X</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Threads */}
              <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <span className="sr-only">Threads</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.0003 0.600098C5.70029 0.600098 0.600293 5.70007 0.600293 12.0001C0.600293 18.3001 5.70029 23.4001 12.0003 23.4001C18.3003 23.4001 23.4003 18.3001 23.4003 12.0001C23.4003 5.70007 18.3003 0.600098 12.0003 0.600098ZM17.6103 16.5301C17.6103 16.5301 16.2703 19.3301 12.0003 19.3301C8.24029 19.3301 5.50029 16.2901 5.50029 12.0001C5.50029 7.71008 8.24029 4.67007 12.0003 4.67007C14.7303 4.67007 16.6303 6.27008 17.2903 8.35007L15.3903 9.07007C14.9303 7.63007 13.6703 6.64008 12.0003 6.64008C9.42029 6.64008 7.65029 8.87008 7.65029 12.0001C7.65029 15.1301 9.42029 17.3601 12.0003 17.3601C14.2203 17.3601 15.4203 15.8901 15.6303 14.7101H12.0003V12.7801H17.7003C17.7603 13.2301 17.7903 13.6801 17.7903 14.1201C17.7903 16.9701 16.0303 19.2601 12.0003 19.2601C7.97029 19.2601 4.71029 16.0001 4.71029 12.0001C4.71029 8.00007 7.97029 4.74008 12.0003 4.74008C16.0303 4.74008 19.2903 8.00007 19.2903 12.0001C19.2903 16.0001 16.0303 19.2601 12.0003 19.2601" />
                </svg>
              </a>
              {/* GitHub */}
              <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Quick Links</h3>
            <ul role="list" className="space-y-3 text-center md:text-left">
              <li>
                <a href="#" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                  Projects
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-center md:items-start gap-4 max-w-sm">
            <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Subscribe to our newsletter</h3>
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-400 text-center md:text-left">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <form className="flex w-full gap-2">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Crowemi. All rights reserved.
          </p>
          <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
            Designed with <span className="text-red-500">♥</span> by Scooter
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
