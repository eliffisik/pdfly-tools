import ToolsCatalog from "@/app/components/ToolsCatalog";

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-white">
      <section className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
          Tool catalog
        </p>
        <h1 className="text-4xl font-bold tracking-tight">PDF tools</h1>
        <p className="mt-4 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
          A focused set of PDF workflows. Available tools are ready to use;
          upcoming tools are already placed in the product structure.
        </p>
      </section>

      <ToolsCatalog />
    </main>
  );
}
