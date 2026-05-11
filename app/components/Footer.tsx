import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-6 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-500">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p>Copyright {new Date().getFullYear()} PDFly. Made by Elif Isik.</p>

        <div className="flex justify-center gap-4">
          <Link
            href="/tools"
            className="transition hover:text-blue-600 dark:hover:text-blue-300"
          >
            Tools
          </Link>
          <Link
            href="/privacy"
            className="transition hover:text-blue-600 dark:hover:text-blue-300"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
