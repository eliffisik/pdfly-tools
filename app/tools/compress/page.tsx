"use client";

import { FileText, X } from "lucide-react";
import { useRef, useState } from "react";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export default function CompressPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [compressedUrl, setCompressedUrl] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFile(event.target.files[0] || null);
    setCompressedUrl("");
    setError("");
  };

  const clearFile = () => {
    setFile(null);
    setCompressedUrl("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
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
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12">
      <section className="w-full max-w-xl rounded-lg border border-zinc-800 bg-zinc-900 p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Compress PDF
        </h1>
        <p className="mb-6 text-center text-sm text-zinc-400">
          Rebuild a PDF with object streams to reduce structural overhead.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          onChange={handleFileChange}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-sm text-zinc-200"
        />

        {file && (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3">
            <span className="flex min-w-0 items-center gap-2 text-sm text-zinc-200">
              <FileText className="h-4 w-4 shrink-0 text-blue-400" />
              <span className="truncate">{file.name}</span>
            </span>
            <button
              type="button"
              onClick={clearFile}
              className="rounded-md p-1 text-zinc-400 transition hover:bg-zinc-800 hover:text-red-300"
              aria-label={`Remove ${file.name}`}
            >
              <X className="h-4 w-4" />
            </button>
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
          <p className="mt-4 text-center text-sm text-zinc-400">
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
