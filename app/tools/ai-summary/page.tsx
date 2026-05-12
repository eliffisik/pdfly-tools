"use client";

import FileDropzone from "@/app/components/FileDropzone";
import SelectedFileRow from "@/app/components/SelectedFileRow";
import ToolPrivacyNote from "@/app/components/ToolPrivacyNote";
import ToolProgress from "@/app/components/ToolProgress";
import ToolShell from "@/app/components/ToolShell";
import { useLanguage } from "@/app/components/LanguageProvider";
import { useToast } from "@/app/components/ToastProvider";
import { toolText } from "@/app/lib/i18n";
import { useState } from "react";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function AISummaryPage() {
  const { dictionary, locale } = useLanguage();
  const { showToast } = useToast();
  const copy = toolText[locale].aiSummary;
  const ui = dictionary.toolUi.aiSummary;
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
    if (!file) {
      const message = dictionary.common.selectPdfFile;
      setError(message);
      showToast({ type: "error", title: dictionary.common.error, message });
      return;
    }

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
        throw new Error(data?.error || dictionary.common.somethingWentWrong);
      }

      setSummary(data?.summary || "");
      showToast({
        type: "success",
        title: dictionary.common.success,
        message: dictionary.common.fileReady,
      });
    } catch (summaryError) {
      const message = getErrorMessage(
        summaryError,
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
          helperText={dictionary.common.chooseTextPdf}
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
        <ToolPrivacyNote ai />

        {file && (
          <div className="mt-4">
            <SelectedFileRow file={file} onRemove={clearFile} />
          </div>
        )}

        <button
          type="button"
          onClick={handleSummary}
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? ui.loading : ui.button}
        </button>

        {loading && <ToolProgress message={ui.progress} />}

        {error && <p className="mt-4 text-center text-sm text-red-300">{error}</p>}

        {summary && !loading && !error && (
          <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="mb-2 text-lg font-semibold text-zinc-950 dark:text-white">
              {ui.resultTitle}
            </h2>
            <p className="whitespace-pre-line text-sm leading-6 text-zinc-700 dark:text-zinc-200">
              {summary}
            </p>
          </div>
        )}
    </ToolShell>
  );
}
