"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { availableTools } from "@/app/lib/tools";
import PDFlyLogo from "./PDFlyLogo";
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
        <Link href="/" aria-label="PDFly home">
          <PDFlyLogo />
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-5 text-sm">
            <Link href="/" className={linkClass(isActive("/"))}>
              Home
            </Link>

            <Link href="/tools" className={linkClass(pathname === "/tools")}>
              Tools
            </Link>

            {availableTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={linkClass(isActive(tool.href))}
              >
                {tool.shortTitle}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
