"use client";

import PDFlyLogo from "@/app/components/PDFlyLogo";
import ToolCard from "@/app/components/ToolCard";
import { useLanguage } from "./components/LanguageProvider";
import { availableTools } from "@/app/lib/tools";

export default function Home() {
  const { dictionary } = useLanguage();

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <section className="mx-auto max-w-5xl px-6 pb-14 pt-20 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
          {dictionary.home.eyebrow}
        </p>
        <h1 className="flex justify-center">
          <PDFlyLogo size="lg" />
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          {dictionary.home.description}
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-6 pb-24 md:grid-cols-3">
        {availableTools.map((tool) => (
          <ToolCard key={tool.href} tool={tool} />
        ))}
      </section>
    </main>
  );
}
