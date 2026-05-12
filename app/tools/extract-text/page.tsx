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

export default function ExtractTextPage() {
  const { dictionary, locale } = useLanguage();
  const { showToast } = useToast();
  const copy = toolText[locale].extractText;
  const ui = dictionary.toolUi.extractText;
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
    if (!file) {
      const message = dictionary.common.selectPdfFile;
      setError(message);
      showToast({ type: "error", title: dictionary.common.error, message });
      return;
    }

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
        throw new Error(data?.error || dictionary.common.somethingWentWrong);
      }

      const extractedText = await response.text();
      const blob = new Blob([extractedText], {
        type: "text/plain;charset=utf-8",
      });

      setText(extractedText);
      setTextUrl(URL.createObjectURL(blob));
      showToast({
        type: "success",
        title: dictionary.common.success,
        message: dictionary.common.fileReady,
      });
    } catch (extractError) {
      const message = getErrorMessage(
        extractError,
        dictionary.common.somethingWentWrong
      );
      setError(message);
      showToast({ type: "error", title: dictionary.common.error, message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolShell
      title={copy.title}
      description={copy.description}
      maxWidth="2xl"
    >
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
        <ToolPrivacyNote />

        {file && (
          <div className="mt-4">
            <SelectedFileRow file={file} onRemove={clearFile} />
          </div>
        )}

        <button
          type="button"
          onClick={handleExtractText}
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? ui.loading : copy.title}
        </button>

        {loading && <ToolProgress message={ui.progress} />}

        {error && <p className="mt-4 text-center text-sm text-red-300">{error}</p>}

        {text && !loading && !error && (
          <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
                {ui.resultTitle}
              </h2>
              {textUrl && (
                <a
                  href={textUrl}
                  download="extracted-text.txt"
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  {ui.download}
                </a>
              )}
            </div>
            <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-md bg-white p-3 text-left text-sm leading-6 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
              {text}
            </pre>
          </div>
        )}
    </ToolShell>
  );
}
