import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Tool } from "@/app/lib/tools";

type ComingSoonToolProps = {
  tool: Tool;
};

export default function ComingSoonTool({ tool }: ComingSoonToolProps) {
  const Icon = tool.icon;

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-white">
      <section className="mx-auto max-w-2xl rounded-lg border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        <Link
          href="/tools"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4" />
          All tools
        </Link>

        <Icon className="mb-5 h-10 w-10 text-blue-500" />
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
          Coming soon
        </p>
        <h1 className="text-3xl font-bold">{tool.title}</h1>
        <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
          {tool.description} This tool is part of the product skeleton and will
          be implemented after the core flows are stable.
        </p>
      </section>
    </main>
  );
}
