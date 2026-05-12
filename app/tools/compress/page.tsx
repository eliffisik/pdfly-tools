"use client";

import FileDropzone from "@/app/components/FileDropzone";
import SelectedFileRow from "@/app/components/SelectedFileRow";
import ToolPrivacyNote from "@/app/components/ToolPrivacyNote";
import { useLanguage } from "@/app/components/LanguageProvider";
import { formatFileSize } from "@/app/lib/format";
import { toolText } from "@/app/lib/i18n";
import { useState } from "react";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

type CompressionResult = {
  originalSize: number;
  compressedSize: number;
  url: string;
};

export default function CompressPage() {
  const { dictionary, locale } = useLanguage();
  const copy = toolText[locale].compress;
  const ui = dictionary.toolUi.compress;
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [compressionResult, setCompressionResult] =
    useState<CompressionResult | null>(null);
  const [error, setError] = useState("");

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFile(selectedFiles[0] || null);
    setCompressionResult(null);
    setError("");
  };

  const clearFile = () => {
    setFile(null);
    setCompressionResult(null);
    setError("");
  };

  const handleCompress = async () => {
    if (!file) return;

    setLoading(true);
    setError("");
    setCompressionResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/compress", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || dictionary.common.somethingWentWrong);
      }

      const blob = await response.blob();
      setCompressionResult({
        originalSize: file.size,
        compressedSize: blob.size,
        url: URL.createObjectURL(blob),
      });
    } catch (compressError) {
      setError(getErrorMessage(compressError, dictionary.common.somethingWentWrong));
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

        <button
          type="button"
          onClick={handleCompress}
          disabled={loading || !file}
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

        {compressionResult && !loading && !error && (
          <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-center dark:border-zinc-800 dark:bg-zinc-950">
            <div className="grid gap-3 text-sm sm:grid-cols-3">
              <div>
                <p className="text-zinc-500 dark:text-zinc-500">{ui.original}</p>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {formatFileSize(compressionResult.originalSize)}
                </p>
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-500">{ui.output}</p>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {formatFileSize(compressionResult.compressedSize)}
                </p>
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-500">{ui.change}</p>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {Math.abs(
                    ((compressionResult.originalSize -
                      compressionResult.compressedSize) /
                      compressionResult.originalSize) *
                      100
                  ).toFixed(1)}
                  %
                  {compressionResult.compressedSize <=
                  compressionResult.originalSize
                    ? ` ${ui.smaller}`
                    : ` ${ui.larger}`}
                </p>
              </div>
            </div>

            <a
              href={compressionResult.url}
              download="compressed.pdf"
              className="mt-5 inline-flex rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              {ui.download}
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
