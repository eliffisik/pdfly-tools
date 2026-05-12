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

export default function ImagesToPdfPage() {
  const { dictionary, locale } = useLanguage();
  const copy = toolText[locale].imagesToPdf;
  const ui = dictionary.toolUi.imagesToPdf;
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [error, setError] = useState("");

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles((currentFiles) => {
      const nextFiles = [...currentFiles];

      for (const selectedFile of selectedFiles) {
        const alreadySelected = nextFiles.some(
          (file) =>
            file.name === selectedFile.name &&
            file.size === selectedFile.size &&
            file.lastModified === selectedFile.lastModified
        );

        if (!alreadySelected) {
          nextFiles.push(selectedFile);
        }
      }

      return nextFiles;
    });
    setPdfUrl("");
    setError("");
  };

  const removeFile = (index: number) => {
    setFiles((currentFiles) =>
      currentFiles.filter((_, fileIndex) => fileIndex !== index)
    );
    setPdfUrl("");
    setError("");
  };

  const handleConvert = async () => {
    if (files.length === 0) return;

    setLoading(true);
    setPdfUrl("");
    setError("");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("/api/images-to-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || dictionary.common.somethingWentWrong);
      }

      const blob = await response.blob();
      setPdfUrl(URL.createObjectURL(blob));
    } catch (convertError) {
      setError(getErrorMessage(convertError, dictionary.common.somethingWentWrong));
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
          label={
            files.length > 0
              ? dictionary.common.addMoreImages
              : dictionary.common.dropImages
          }
          helperText={dictionary.common.chooseImages}
          accept="image/png,image/jpeg,.png,.jpg,.jpeg"
          multiple
          disabled={loading}
          onFilesSelected={handleFilesSelected}
        />
        <ToolPrivacyNote />

        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {dictionary.common.selectedImages} ({files.length})
            </p>

            {files.map((file, index) => (
              <SelectedFileRow
                key={`${file.name}-${file.lastModified}`}
                file={file}
                onRemove={() => removeFile(index)}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleConvert}
          disabled={loading || files.length === 0}
          className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? ui.loading : ui.button}
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
              download="images.pdf"
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
