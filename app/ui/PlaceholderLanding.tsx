"use client";

import { Github, Linkedin, Mail, Threads, Twitter } from "iconoir-react";

import Header from "./Header";

export default function PlaceholderLanding() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">

      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <section className="flex flex-col items-center gap-8 text-center">
          <Header />
          <div className="flex flex-wrap items-center justify-center gap-4">
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
        </section>
      </main>
    </div>
  );
}
