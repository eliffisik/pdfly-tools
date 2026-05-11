"use client";

import FileDropzone from "@/app/components/FileDropzone";
import SelectedFileRow from "@/app/components/SelectedFileRow";
import ToolPrivacyNote from "@/app/components/ToolPrivacyNote";
import { useState } from "react";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export default function ExtractTextPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [textUrl, setTextUrl] = useState("");
  const [error, setError] = useState("");

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFile(selectedFiles[0] || null);
    setText("");
    setTextUrl("");
    setError("");
  };

  const clearFile = () => {
    setFile(null);
    setText("");
    setTextUrl("");
    setError("");
  };

  const handleExtractText = async () => {
    if (!file) return;

    setLoading(true);
    setText("");
    setTextUrl("");
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/extract-text", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Text extraction failed.");
      }

      const extractedText = await response.text();
      const blob = new Blob([extractedText], {
        type: "text/plain;charset=utf-8",
      });

      setText(extractedText);
      setTextUrl(URL.createObjectURL(blob));
    } catch (extractError) {
      setError(getErrorMessage(extractError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12 transition-colors dark:bg-zinc-950">
      <section className="w-full max-w-2xl rounded-lg border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-2 text-center text-3xl font-bold text-zinc-950 dark:text-white">
          Extract Text
        </h1>
        <p className="mb-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Extract readable text from a PDF and download it as a TXT file.
        </p>

        <FileDropzone
          label="Drop a PDF here"
          helperText="or click to choose one text-based PDF"
          disabled={loading}
          onFilesSelected={handleFilesSelected}
        />
        <ToolPrivacyNote />

        {file && (
          <div className="mt-4">
            <SelectedFileRow file={file} onRemove={clearFile} />
          </div>
        )}

        <button
          type="button"
          onClick={handleExtractText}
          disabled={loading || !file}
          className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Extracting text..." : "Extract Text"}
        </button>

        {loading && (
          <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Reading text from your PDF...
          </p>
        )}

        {error && <p className="mt-4 text-center text-sm text-red-300">{error}</p>}

        {text && !loading && !error && (
          <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
                Extracted text
              </h2>
              {textUrl && (
                <a
                  href={textUrl}
                  download="extracted-text.txt"
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Download TXT
                </a>
              )}
            </div>
            <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-md bg-white p-3 text-left text-sm leading-6 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
              {text}
            </pre>
          </div>
        )}
      </section>
    </main>
  );
}
