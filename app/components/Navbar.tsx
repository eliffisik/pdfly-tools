"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ||
    (path !== "/" && pathname.startsWith(path));

  const linkClass = (active: boolean) =>
    `transition ${
      active
        ? "text-blue-500 font-medium"
        : "text-zinc-600 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400"
    }`;

  return (
    <nav className="w-full border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-500">
          PDFly
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-5 text-sm">
            <Link href="/" className={linkClass(isActive("/"))}>
              Home
            </Link>

            <Link
              href="/tools/merge"
              className={linkClass(isActive("/tools/merge"))}
            >
              Merge
            </Link>

            <Link
              href="/tools/compress"
              className={linkClass(isActive("/tools/compress"))}
            >
              Compress
            </Link>

            <Link
              href="/tools/ai-summary"
              className={linkClass(isActive("/tools/ai-summary"))}
            >
              AI Summary
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
