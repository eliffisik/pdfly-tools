"use client";

import FileDropzone from "@/app/components/FileDropzone";
import SelectedFileRow from "@/app/components/SelectedFileRow";
import { useState } from "react";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export default function CompressPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [compressedUrl, setCompressedUrl] = useState("");
  const [error, setError] = useState("");

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFile(selectedFiles[0] || null);
    setCompressedUrl("");
    setError("");
  };

  const clearFile = () => {
    setFile(null);
    setCompressedUrl("");
    setError("");
  };

  const handleCompress = async () => {
    if (!file) return;

    setLoading(true);
    setError("");
    setCompressedUrl("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/compress", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Compression failed.");
      }

      const blob = await response.blob();
      setCompressedUrl(URL.createObjectURL(blob));
    } catch (compressError) {
      setError(getErrorMessage(compressError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12 transition-colors dark:bg-zinc-950">
      <section className="w-full max-w-xl rounded-lg border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-2 text-center text-3xl font-bold text-zinc-950 dark:text-white">
          Compress PDF
        </h1>
        <p className="mb-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Rebuild a PDF with object streams to reduce structural overhead.
        </p>

        <FileDropzone
          label="Drop a PDF here"
          helperText="or click to choose one PDF file"
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
          onClick={handleCompress}
          disabled={loading || !file}
          className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Compressing..." : "Compress PDF"}
        </button>

        {loading && (
          <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Processing your file...
          </p>
        )}

        {error && <p className="mt-4 text-center text-sm text-red-300">{error}</p>}

        {compressedUrl && !loading && !error && (
          <div className="mt-6 text-center">
            <a
              href={compressedUrl}
              download="compressed.pdf"
              className="inline-flex rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Download compressed PDF
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
