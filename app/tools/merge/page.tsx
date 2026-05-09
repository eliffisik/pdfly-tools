"use client";

import { FileText, X } from "lucide-react";
import { useRef, useState } from "react";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export default function MergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFiles(Array.from(event.target.files));
    setMergedPdfUrl("");
    setError("");
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);
    setFiles(updatedFiles);
    setMergedPdfUrl("");
    setError("");

    if (updatedFiles.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleMerge = async () => {
    if (files.length < 2) return;

    setLoading(true);
    setMergedPdfUrl("");
    setError("");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("/api/merge", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Merge failed.");
      }

      const blob = await response.blob();
      setMergedPdfUrl(URL.createObjectURL(blob));
    } catch (mergeError) {
      setError(getErrorMessage(mergeError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12">
      <section className="w-full max-w-xl rounded-lg border border-zinc-800 bg-zinc-900 p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Merge PDFs
        </h1>
        <p className="mb-6 text-center text-sm text-zinc-400">
          Upload at least two PDFs and combine them in the selected order.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          multiple
          onChange={handleFileChange}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-sm text-zinc-200"
        />

        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-zinc-400">Selected files ({files.length})</p>

            {files.map((file, index) => (
              <div
                key={`${file.name}-${file.lastModified}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3"
              >
                <span className="flex min-w-0 items-center gap-2 text-sm text-zinc-200">
                  <FileText className="h-4 w-4 shrink-0 text-blue-400" />
                  <span className="truncate">{file.name}</span>
                </span>

                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="rounded-md p-1 text-zinc-400 transition hover:bg-zinc-800 hover:text-red-300"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleMerge}
          disabled={loading || files.length < 2}
          className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Merging PDFs..." : "Merge PDFs"}
        </button>

        {loading && (
          <p className="mt-4 text-center text-sm text-zinc-400">
            Processing your files...
          </p>
        )}

        {error && <p className="mt-4 text-center text-sm text-red-300">{error}</p>}

        {mergedPdfUrl && !loading && !error && (
          <div className="mt-6 text-center">
            <a
              href={mergedPdfUrl}
              download="merged.pdf"
              className="inline-flex rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Download merged PDF
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
