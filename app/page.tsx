import ToolCard from "@/app/components/ToolCard";
import { availableTools } from "@/app/lib/tools";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <section className="mx-auto max-w-5xl px-6 pb-14 pt-20 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
          Fast PDF tools for everyday work
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-6xl">
          PDFly
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          Merge, compress, and summarize PDFs from a focused web workspace.
          Built to grow into a polished iLovePDF-style product.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-6 pb-24 md:grid-cols-3">
        {availableTools.map((tool) => (
          <ToolCard key={tool.href} tool={tool} />
        ))}
      </section>

      <footer className="border-t border-zinc-200 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        <p>Copyright {new Date().getFullYear()} PDFly. Made by Elif Isik.</p>
      </footer>
    </main>
  );
}
