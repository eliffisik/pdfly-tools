"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toolText } from "@/app/lib/i18n";
import { availableTools } from "@/app/lib/tools";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";
import PDFlyLogo from "./PDFlyLogo";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { dictionary, locale } = useLanguage();

  const isActive = (path: string) =>
    pathname === path ||
    (path !== "/" && pathname.startsWith(path));

  const linkClass = (active: boolean) =>
    `transition ${
      active
        ? "text-blue-500 font-medium"
        : "text-zinc-600 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400"
    }`;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="PDFly home" onClick={closeMobileMenu}>
          <PDFlyLogo />
        </Link>

        <div className="hidden items-center gap-5 text-sm lg:flex">
          <Link href="/" className={linkClass(isActive("/"))}>
            {dictionary.nav.home}
          </Link>

          <Link href="/tools" className={linkClass(pathname === "/tools")}>
            {dictionary.nav.tools}
          </Link>

          <div className="group relative">
            <button
              type="button"
              className={linkClass(pathname.startsWith("/tools/"))}
            >
              {dictionary.nav.pdfTools}
            </button>

            <div className="invisible absolute right-0 top-full w-64 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="rounded-lg border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                {availableTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className={`block rounded-md px-3 py-2 text-sm transition ${
                      isActive(tool.href)
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300"
                        : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {toolText[locale][tool.id].title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-500 dark:hover:text-blue-300"
            aria-label={
              mobileMenuOpen
                ? dictionary.nav.closeMenu
                : dictionary.nav.openMenu
            }
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`rounded-md px-3 py-2 text-sm ${linkClass(
                isActive("/")
              )}`}
            >
              {dictionary.nav.home}
            </Link>

            <Link
              href="/tools"
              onClick={closeMobileMenu}
              className={`rounded-md px-3 py-2 text-sm ${linkClass(
                pathname === "/tools"
              )}`}
            >
              {dictionary.nav.tools}
            </Link>

            <div className="mt-2 border-t border-zinc-200 pt-2 dark:border-zinc-800">
              {availableTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={closeMobileMenu}
                  className={`block rounded-md px-3 py-2 text-sm transition ${
                    isActive(tool.href)
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`}
                >
                  {toolText[locale][tool.id].title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
