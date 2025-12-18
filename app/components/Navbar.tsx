"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-zinc-800 bg-black">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-blue-600 hover:opacity-90"
        >
          PDFly
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="text-gray-300 hover:text-white transition"
          >
            Home
          </Link>
          <Link
            href="/tools/merge"
            className="text-gray-300 hover:text-white transition"
          >
            Merge
          </Link>
          <Link
            href="/tools/compress"
            className="text-gray-300 hover:text-white transition"
          >
            Compress
          </Link>
          <Link
            href="/tools/ai-summary"
            className="text-gray-300 hover:text-white transition"
          >
            AI Summary
          </Link>
        </div>
      </div>
    </nav>
  );
}
