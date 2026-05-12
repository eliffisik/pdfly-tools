type ToolShellProps = {
  title: string;
  description: string;
  maxWidth?: "xl" | "2xl";
  children: React.ReactNode;
};

const maxWidthClass = {
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
};

export default function ToolShell({
  title,
  description,
  maxWidth = "xl",
  children,
}: ToolShellProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12 transition-colors dark:bg-zinc-950">
      <section
        className={`w-full ${maxWidthClass[maxWidth]} rounded-lg border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900`}
      >
        <h1 className="mb-2 text-center text-3xl font-bold text-zinc-950 dark:text-white">
          {title}
        </h1>
        <p className="mb-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>

        {children}
      </section>
    </main>
  );
}
