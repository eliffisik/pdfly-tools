"use client";

import ToolsCatalog from "@/app/components/ToolsCatalog";
import { useLanguage } from "@/app/components/LanguageProvider";

export default function ToolsPage() {
  const { dictionary } = useLanguage();

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-white">
      <section className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
          {dictionary.toolsPage.eyebrow}
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          {dictionary.toolsPage.title}
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
          {dictionary.toolsPage.description}
        </p>
      </section>

      <ToolsCatalog />
    </main>
  );
}
