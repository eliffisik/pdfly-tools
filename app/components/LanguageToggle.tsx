"use client";

import { localeLabels, type Locale } from "@/app/lib/i18n";
import { useLanguage } from "./LanguageProvider";

const locales: Locale[] = ["en", "tr"];

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="inline-flex rounded-md border border-zinc-200 bg-white p-0.5 dark:border-zinc-800 dark:bg-zinc-900">
      {locales.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          className={`h-8 rounded px-2.5 text-xs font-semibold transition ${
            locale === option
              ? "bg-blue-600 text-white"
              : "text-zinc-600 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-300"
          }`}
          aria-pressed={locale === option}
        >
          {localeLabels[option]}
        </button>
      ))}
    </div>
  );
}
