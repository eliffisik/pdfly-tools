"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toolText } from "@/app/lib/i18n";
import {
  toolCategories,
  tools,
  type ToolCategory,
  type ToolStatus,
} from "@/app/lib/tools";
import { useLanguage } from "./LanguageProvider";
import ToolCard from "./ToolCard";

type StatusFilter = "all" | ToolStatus;

export default function ToolsCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | ToolCategory>("All");
  const [status, setStatus] = useState<StatusFilter>("all");
  const { dictionary, locale } = useLanguage();

  const statusFilters: Array<{ label: string; value: StatusFilter }> = [
    { label: dictionary.filters.all, value: "all" },
    { label: dictionary.filters.available, value: "available" },
    { label: dictionary.filters.comingSoon, value: "coming-soon" },
  ];

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const copy = toolText[locale][tool.id];
      const matchesQuery =
        !normalizedQuery ||
        copy.title.toLowerCase().includes(normalizedQuery) ||
        copy.description.toLowerCase().includes(normalizedQuery);
      const matchesCategory = category === "All" || tool.category === category;
      const matchesStatus = status === "all" || tool.status === status;

      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [category, locale, query, status]);

  return (
    <section className="mx-auto mt-10 max-w-5xl">
      <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dictionary.toolsPage.search}
            className="w-full rounded-lg border border-zinc-300 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-blue-950"
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-2">
          {toolCategories.map((toolCategory) => (
            <button
              key={toolCategory}
              type="button"
              onClick={() => setCategory(toolCategory)}
              className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                category === toolCategory
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-blue-300 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
              }`}
            >
              {dictionary.categories[toolCategory]}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setStatus(filter.value)}
              className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                status === filter.value
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-blue-300 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {filteredTools.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.href} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
          {dictionary.toolsPage.empty}
        </div>
      )}
    </section>
  );
}
