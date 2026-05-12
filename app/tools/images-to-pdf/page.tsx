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

export default function ImagesToPdfPage() {
  const { dictionary, locale } = useLanguage();
  const { showToast } = useToast();
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
    if (files.length === 0) {
      const message = dictionary.common.selectImageFile;
      setError(message);
      showToast({ type: "error", title: dictionary.common.error, message });
      return;
    }

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
    <ToolShell title={copy.title} description={copy.description}>
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
          onFilesRejected={() => {
            const message = dictionary.common.invalidImageFile;
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
            download="images.pdf"
            label={ui.download}
          />
        )}
    </ToolShell>
  );
}
