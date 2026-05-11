"use client";

import FileDropzone from "@/app/components/FileDropzone";
import SelectedFileRow from "@/app/components/SelectedFileRow";
import ToolPrivacyNote from "@/app/components/ToolPrivacyNote";
import { useState } from "react";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export default function DeletePagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [ranges, setRanges] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [error, setError] = useState("");

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFile(selectedFiles[0] || null);
    setPdfUrl("");
    setError("");
  };

  const clearFile = () => {
    setFile(null);
    setPdfUrl("");
    setError("");
  };

  const handleDeletePages = async () => {
    if (!file || !ranges.trim()) return;

    setLoading(true);
    setPdfUrl("");
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("ranges", ranges);

    try {
      const response = await fetch("/api/delete-pages", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Delete pages failed.");
      }

      const blob = await response.blob();
      setPdfUrl(URL.createObjectURL(blob));
    } catch (deleteError) {
      setError(getErrorMessage(deleteError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12 transition-colors dark:bg-zinc-950">
      <section className="w-full max-w-xl rounded-lg border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-2 text-center text-3xl font-bold text-zinc-950 dark:text-white">
          Delete Pages
        </h1>
        <p className="mb-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Remove unwanted pages and download a cleaned PDF.
        </p>

        <FileDropzone
          label="Drop a PDF here"
          helperText="or click to choose one PDF file"
          disabled={loading}
          onFilesSelected={handleFilesSelected}
        />
        <ToolPrivacyNote />

        {file && (
          <div className="mt-4">
            <SelectedFileRow file={file} onRemove={clearFile} />
          </div>
        )}

        <label
          htmlFor="delete-page-ranges"
          className="mt-6 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
        >
          Pages to delete
        </label>
        <input
          id="delete-page-ranges"
          type="text"
          value={ranges}
          onChange={(event) => {
            setRanges(event.target.value);
            setPdfUrl("");
            setError("");
          }}
          placeholder="2,4-6"
          disabled={loading}
          className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-blue-950"
        />
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
          Use commas for separate pages and hyphens for ranges.
        </p>

        <button
          type="button"
          onClick={handleDeletePages}
          disabled={loading || !file || !ranges.trim()}
          className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Deleting pages..." : "Delete Pages"}
        </button>

        {loading && (
          <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Creating your cleaned PDF...
          </p>
        )}

        {error && <p className="mt-4 text-center text-sm text-red-300">{error}</p>}

        {pdfUrl && !loading && !error && (
          <div className="mt-6 text-center">
            <a
              href={pdfUrl}
              download="deleted-pages.pdf"
              className="inline-flex rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Download cleaned PDF
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
