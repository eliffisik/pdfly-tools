type ToolProgressProps = {
  message: string;
};

export default function ToolProgress({ message }: ToolProgressProps) {
  return (
    <div
      className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
      role="status"
      aria-live="polite"
    >
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600 dark:border-blue-950 dark:border-t-blue-300" />
      <span>{message}</span>
    </div>
  );
}
