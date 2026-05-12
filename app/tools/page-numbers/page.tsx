"use client";

import FileDropzone from "@/app/components/FileDropzone";
import SelectedFileRow from "@/app/components/SelectedFileRow";
import ToolPrivacyNote from "@/app/components/ToolPrivacyNote";
import ToolProgress from "@/app/components/ToolProgress";
import ToolDownloadResult from "@/app/components/ToolDownloadResult";
import ToolShell from "@/app/components/ToolShell";
import { useLanguage } from "@/app/components/LanguageProvider";
import { useToast } from "@/app/components/ToastProvider";
import { toolText } from "@/app/lib/i18n";
import { useState } from "react";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function PageNumbersPage() {
  const { dictionary, locale } = useLanguage();
  const { showToast } = useToast();
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
    if (!file) {
      const message = dictionary.common.selectPdfFile;
      setError(message);
      showToast({ type: "error", title: dictionary.common.error, message });
      return;
    }

    if (!startNumber.trim()) {
      const message = dictionary.common.enterStartNumber;
      setError(message);
      showToast({ type: "error", title: dictionary.common.error, message });
      return;
    }

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
      showToast({
        type: "success",
        title: dictionary.common.success,
        message: dictionary.common.fileReady,
      });
    } catch (pageNumberError) {
      const message = getErrorMessage(
        pageNumberError,
        dictionary.common.somethingWentWrong
      );
      setError(message);
      showToast({ type: "error", title: dictionary.common.error, message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolShell title={copy.title} description={copy.description}>
        <FileDropzone
          label={dictionary.common.dropPdf}
          helperText={dictionary.common.chooseOnePdf}
          disabled={loading}
          onFilesSelected={handleFilesSelected}
          onFilesRejected={() => {
            const message = dictionary.common.invalidPdfFile;
            setError(message);
            showToast({
              type: "error",
              title: dictionary.common.error,
              message,
            });
          }}
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
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? ui.loading : copy.title}
        </button>

        {loading && <ToolProgress message={ui.progress} />}

        {error && <p className="mt-4 text-center text-sm text-red-300">{error}</p>}

        {pdfUrl && !loading && !error && (
          <ToolDownloadResult
            href={pdfUrl}
            download="numbered.pdf"
            label={ui.download}
          />
        )}
    </ToolShell>
  );
}
