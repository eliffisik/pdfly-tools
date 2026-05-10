"use client";

import FileDropzone from "@/app/components/FileDropzone";
import SelectedFileRow from "@/app/components/SelectedFileRow";
import { useState } from "react";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export default function AISummaryPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFile(selectedFiles[0] || null);
    setSummary("");
    setError("");
  };

  const clearFile = () => {
    setFile(null);
    setSummary("");
    setError("");
  };

  const handleSummary = async () => {
    if (!file) return;

    setLoading(true);
    setSummary("");
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/ai-summary", {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Summary failed.");
      }

      setSummary(data?.summary || "");
    } catch (summaryError) {
      setError(getErrorMessage(summaryError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12 transition-colors dark:bg-zinc-950">
      <section className="w-full max-w-xl rounded-lg border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-2 text-center text-3xl font-bold text-zinc-950 dark:text-white">
          AI Summary
        </h1>
        <p className="mb-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Upload a text-based PDF and turn it into a concise summary.
        </p>

        <FileDropzone
          label="Drop a PDF here"
          helperText="or click to choose one text-based PDF"
          disabled={loading}
          onFilesSelected={handleFilesSelected}
        />

        {file && (
          <div className="mt-4">
            <SelectedFileRow file={file} onRemove={clearFile} />
          </div>
        )}

        <button
          type="button"
          onClick={handleSummary}
          disabled={loading || !file}
          className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Summarizing..." : "Summarize PDF"}
        </button>

        {loading && (
          <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Reading the PDF and preparing the summary...
          </p>
        )}

        {error && <p className="mt-4 text-center text-sm text-red-300">{error}</p>}

        {summary && !loading && !error && (
          <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="mb-2 text-lg font-semibold text-zinc-950 dark:text-white">
              Summary
            </h2>
            <p className="whitespace-pre-line text-sm leading-6 text-zinc-700 dark:text-zinc-200">
              {summary}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
