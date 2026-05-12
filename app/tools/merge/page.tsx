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

export default function MergePage() {
  const { dictionary, locale } = useLanguage();
  const { showToast } = useToast();
  const copy = toolText[locale].merge;
  const ui = dictionary.toolUi.merge;
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState("");
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
    setMergedPdfUrl("");
    setError("");
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);
    setFiles(updatedFiles);
    setMergedPdfUrl("");
    setError("");
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      const message = dictionary.common.selectAtLeastTwoPdfs;
      setError(message);
      showToast({ type: "error", title: dictionary.common.error, message });
      return;
    }

    setLoading(true);
    setMergedPdfUrl("");
    setError("");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("/api/merge", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || dictionary.common.somethingWentWrong);
      }

      const blob = await response.blob();
      setMergedPdfUrl(URL.createObjectURL(blob));
      showToast({
        type: "success",
        title: dictionary.common.success,
        message: dictionary.common.fileReady,
      });
    } catch (mergeError) {
      const message = getErrorMessage(
        mergeError,
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
          label={
            files.length > 0
              ? dictionary.common.addMorePdfs
              : dictionary.common.dropPdfs
          }
          helperText={dictionary.common.chooseMultiplePdfs}
          multiple
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

        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {dictionary.common.selectedFiles} ({files.length})
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
          onClick={handleMerge}
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? ui.loading : copy.title}
        </button>

        {loading && <ToolProgress message={ui.progress} />}

        {error && <p className="mt-4 text-center text-sm text-red-300">{error}</p>}

        {mergedPdfUrl && !loading && !error && (
          <ToolDownloadResult
            href={mergedPdfUrl}
            download="merged.pdf"
            label={ui.download}
          />
        )}
    </ToolShell>
  );
}
