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

export default function TextToPdfPage() {
  const { dictionary, locale } = useLanguage();
  const { showToast } = useToast();
  const copy = toolText[locale].textToPdf;
  const ui = dictionary.toolUi.textToPdf;
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
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

  const handleConvert = async () => {
    if (!text.trim() && !file) {
      const message = dictionary.common.enterTextOrTxt;
      setError(message);
      showToast({ type: "error", title: dictionary.common.error, message });
      return;
    }

    setLoading(true);
    setPdfUrl("");
    setError("");

    const formData = new FormData();
    formData.append("text", text);
    if (file) formData.append("file", file);

    try {
      const response = await fetch("/api/text-to-pdf", {
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
    } catch (convertError) {
      const message = getErrorMessage(
        convertError,
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
        <label
          htmlFor="text-content"
          className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
        >
          {ui.text}
        </label>
        <textarea
          id="text-content"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setPdfUrl("");
            setError("");
          }}
          placeholder={ui.placeholder}
          disabled={loading}
          className="mt-2 min-h-56 w-full resize-y rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm leading-6 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-blue-950"
        />

        <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-zinc-400">
          <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          {ui.divider}
          <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <FileDropzone
          label={dictionary.common.dropTxt}
          helperText={dictionary.common.chooseTxt}
          accept="text/plain,.txt"
          disabled={loading}
          onFilesSelected={handleFilesSelected}
          onFilesRejected={() => {
            const message = dictionary.common.invalidTxtFile;
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
          onClick={handleConvert}
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? ui.loading : ui.button}
        </button>

        {loading && <ToolProgress message={ui.progress} />}

        {error && <p className="mt-4 text-center text-sm text-red-300">{error}</p>}

        {pdfUrl && !loading && !error && (
          <ToolDownloadResult
            href={pdfUrl}
            download="text.pdf"
            label={ui.download}
          />
        )}
    </ToolShell>
  );
}
