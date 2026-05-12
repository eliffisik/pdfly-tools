"use client";

import FileDropzone from "@/app/components/FileDropzone";
import SelectedFileRow from "@/app/components/SelectedFileRow";
import ToolPrivacyNote from "@/app/components/ToolPrivacyNote";
import { useLanguage } from "@/app/components/LanguageProvider";
import { toolText } from "@/app/lib/i18n";
import { useState } from "react";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function PageNumbersPage() {
  const { dictionary, locale } = useLanguage();
  const copy = toolText[locale].pageNumbers;
  const ui = dictionary.toolUi.pageNumbers;
  const [file, setFile] = useState<File | null>(null);
  const [startNumber, setStartNumber] = useState("1");
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

  const handleAddPageNumbers = async () => {
    if (!file) return;

    setLoading(true);
    setPdfUrl("");
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("startNumber", startNumber);

    try {
      const response = await fetch("/api/page-numbers", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || dictionary.common.somethingWentWrong);
      }

      const blob = await response.blob();
      setPdfUrl(URL.createObjectURL(blob));
    } catch (pageNumberError) {
      setError(
        getErrorMessage(pageNumberError, dictionary.common.somethingWentWrong)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12 transition-colors dark:bg-zinc-950">
      <section className="w-full max-w-xl rounded-lg border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-2 text-center text-3xl font-bold text-zinc-950 dark:text-white">
          {copy.title}
        </h1>
        <p className="mb-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          {copy.description}
        </p>

        <FileDropzone
          label={dictionary.common.dropPdf}
          helperText={dictionary.common.chooseOnePdf}
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
          htmlFor="start-number"
          className="mt-6 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
        >
          {ui.startNumber}
        </label>
        <input
          id="start-number"
          type="number"
          min="1"
          step="1"
          value={startNumber}
          onChange={(event) => {
            setStartNumber(event.target.value);
            setPdfUrl("");
            setError("");
          }}
          disabled={loading}
          className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-blue-950"
        />

        <button
          type="button"
          onClick={handleAddPageNumbers}
          disabled={loading || !file || !startNumber.trim()}
          className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? ui.loading : copy.title}
        </button>

        {loading && (
          <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
            {ui.progress}
          </p>
        )}

        {error && <p className="mt-4 text-center text-sm text-red-300">{error}</p>}

        {pdfUrl && !loading && !error && (
          <div className="mt-6 text-center">
            <a
              href={pdfUrl}
              download="numbered.pdf"
              className="inline-flex rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              {ui.download}
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
