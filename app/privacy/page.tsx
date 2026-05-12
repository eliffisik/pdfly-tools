"use client";

import { useLanguage } from "../components/LanguageProvider";

export default function PrivacyPage() {
  const { dictionary } = useLanguage();
  const copy = dictionary.privacyPage;

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-white">
      <section className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
          {copy.eyebrow}
        </p>
        <h1 className="text-4xl font-bold tracking-tight">{copy.title}</h1>
        <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
          {copy.description}
        </p>
      </section>

      <section className="mx-auto mt-10 grid max-w-3xl gap-4">
        {copy.sections.map((section) => (
          <article
            key={section.title}
            className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
              {section.body}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
