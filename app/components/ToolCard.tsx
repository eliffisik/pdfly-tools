"use client";

import Link from "next/link";
import { toolText } from "@/app/lib/i18n";
import type { Tool } from "@/app/lib/tools";
import { useLanguage } from "./LanguageProvider";

type ToolCardProps = {
  tool: Tool;
};

export default function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;
  const isAvailable = tool.status === "available";
  const { dictionary, locale } = useLanguage();
  const copy = toolText[locale][tool.id];

  return (
    <Link
      href={tool.href}
      className="group relative rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-500 dark:hover:bg-zinc-900/80"
    >
      {!isAvailable && (
        <span className="absolute right-4 top-4 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300">
          {dictionary.filters.soon}
        </span>
      )}

      <Icon className="mb-5 h-8 w-8 text-blue-400 transition group-hover:scale-105" />
      <h2 className="mb-2 text-xl font-semibold text-zinc-950 dark:text-white">
        {copy.title}
      </h2>
      <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {copy.description}
      </p>
    </Link>
  );
}
