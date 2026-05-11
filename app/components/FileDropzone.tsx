"use client";

import { Upload } from "lucide-react";
import { useRef, useState } from "react";

type FileDropzoneProps = {
  label: string;
  helperText: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  onFilesSelected: (files: File[]) => void;
};

export default function FileDropzone({
  label,
  helperText,
  accept = "application/pdf,.pdf",
  multiple = false,
  disabled = false,
  onFilesSelected,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selectFiles = (fileList: FileList | null) => {
    if (!fileList || disabled) return;

    const files = Array.from(fileList);
    onFilesSelected(multiple ? files : files.slice(0, 1));

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    selectFiles(event.dataTransfer.files);
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`rounded-lg border border-dashed p-6 text-center transition ${
        isDragging
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
          : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(event) => selectFiles(event.target.files)}
        className="hidden"
      />

      <Upload className="mx-auto mb-4 h-8 w-8 text-blue-500" />
      <p className="font-semibold text-zinc-900 dark:text-white">{label}</p>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {helperText}
      </p>
    </div>
  );
}
