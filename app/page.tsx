import Link from "next/link";
import { FileDown, FilePlus, Sparkles } from "lucide-react";

const tools = [
  {
    href: "/tools/merge",
    title: "Merge PDFs",
    description: "Combine multiple PDF files into one clean document.",
    icon: FilePlus,
  },
  {
    href: "/tools/compress",
    title: "Compress PDF",
    description: "Reduce file size by rebuilding the document structure.",
    icon: FileDown,
  },
  {
    href: "/tools/ai-summary",
    title: "AI Summary",
    description: "Extract readable text and get a concise summary.",
    icon: Sparkles,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="mx-auto max-w-5xl px-6 pb-14 pt-20 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-blue-300">
          Fast PDF tools for everyday work
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
          PDFly
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
          Merge, compress, and summarize PDFs from a focused web workspace.
          Built to grow into a polished iLovePDF-style product.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-6 pb-24 md:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon;

          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition hover:border-blue-500 hover:bg-zinc-900/80"
            >
              <Icon className="mb-5 h-8 w-8 text-blue-400 transition group-hover:scale-105" />
              <h2 className="mb-2 text-xl font-semibold text-white">
                {tool.title}
              </h2>
              <p className="text-sm leading-6 text-zinc-400">
                {tool.description}
              </p>
            </Link>
          );
        })}
      </section>

      <footer className="border-t border-zinc-800 py-6 text-center text-sm text-zinc-500">
        <p>Copyright {new Date().getFullYear()} PDFly. Made by Elif Isik.</p>
      </footer>
    </main>
  );
}
