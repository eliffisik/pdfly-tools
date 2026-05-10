"use client";

import { FileText, X } from "lucide-react";

type SelectedFileRowProps = {
  file: File;
  onRemove: () => void;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  const units = ["KB", "MB", "GB"];
  let size = bytes / 1024;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(size >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

export default function SelectedFileRow({
  file,
  onRemove,
}: SelectedFileRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
      <span className="flex min-w-0 items-center gap-2 text-sm text-zinc-800 dark:text-zinc-200">
        <FileText className="h-4 w-4 shrink-0 text-blue-400" />
        <span className="min-w-0">
          <span className="block truncate">{file.name}</span>
          <span className="block text-xs text-zinc-500 dark:text-zinc-500">
            {formatFileSize(file.size)}
          </span>
        </span>
      </span>

      <button
        type="button"
        onClick={onRemove}
        className="rounded-md p-1 text-zinc-500 transition hover:bg-zinc-200 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-red-300"
        aria-label={`Remove ${file.name}`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
