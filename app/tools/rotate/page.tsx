"use client";

import FileDropzone from "@/app/components/FileDropzone";
import SelectedFileRow from "@/app/components/SelectedFileRow";
import ToolPrivacyNote from "@/app/components/ToolPrivacyNote";
import { useLanguage } from "@/app/components/LanguageProvider";
import { toolText } from "@/app/lib/i18n";
import { RotateCw } from "lucide-react";
import { useState } from "react";

const rotationAngles = [90, 180, 270];

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function RotatePage() {
  const { dictionary, locale } = useLanguage();
  const copy = toolText[locale].rotate;
  const ui = dictionary.toolUi.rotate;
  const [file, setFile] = useState<File | null>(null);
  const [ranges, setRanges] = useState("");
  const [angle, setAngle] = useState(90);
  const [loading, setLoading] = useState(false);
  const [rotatedUrl, setRotatedUrl] = useState("");
  const [error, setError] = useState("");

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFile(selectedFiles[0] || null);
    setRotatedUrl("");
    setError("");
  };

  const clearFile = () => {
    setFile(null);
    setRotatedUrl("");
    setError("");
  };

  const handleRotate = async () => {
    if (!file) return;

    setLoading(true);
    setRotatedUrl("");
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("ranges", ranges);
    formData.append("angle", String(angle));

    try {
      const response = await fetch("/api/rotate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || dictionary.common.somethingWentWrong);
      }

      const blob = await response.blob();
      setRotatedUrl(URL.createObjectURL(blob));
    } catch (rotateError) {
      setError(getErrorMessage(rotateError, dictionary.common.somethingWentWrong));
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

        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {ui.rotation}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {rotationAngles.map((rotationAngle) => (
              <button
                key={rotationAngle}
                type="button"
                onClick={() => {
                  setAngle(rotationAngle);
                  setRotatedUrl("");
                  setError("");
                }}
                disabled={loading}
                className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  angle === rotationAngle
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-zinc-300 bg-white text-zinc-700 hover:border-blue-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
                }`}
              >
                <RotateCw className="h-4 w-4" />
                {rotationAngle} {ui.degree}
              </button>
            ))}
          </div>
        </div>

        <label
          htmlFor="page-ranges"
          className="mt-6 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
        >
          {dictionary.common.pageRanges}
        </label>
        <input
          id="page-ranges"
          type="text"
          value={ranges}
          onChange={(event) => {
            setRanges(event.target.value);
            setRotatedUrl("");
            setError("");
          }}
          placeholder={ui.allPagesPlaceholder}
          disabled={loading}
          className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-blue-950"
        />
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
          {dictionary.common.optionalPageRangesHelp}
        </p>

        <button
          type="button"
          onClick={handleRotate}
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

        {rotatedUrl && !loading && !error && (
          <div className="mt-6 text-center">
            <a
              href={rotatedUrl}
              download="rotated.pdf"
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
