"use client";

import FileDropzone from "@/app/components/FileDropzone";
import SelectedFileRow from "@/app/components/SelectedFileRow";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

type ConvertedImage = {
  pageNumber: number;
  fileName: string;
  url: string;
};

const scaleOptions = [
  { label: "Standard", value: 1.5 },
  { label: "High", value: 2 },
  { label: "Ultra", value: 3 },
];

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

function canvasToPngBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Could not create an image from this page."));
        return;
      }

      resolve(blob);
    }, "image/png");
  });
}

export default function PdfToImagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState(2);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ConvertedImage[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [images]);

  const clearImages = () => {
    images.forEach((image) => URL.revokeObjectURL(image.url));
    setImages([]);
  };

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFile(selectedFiles[0] || null);
    clearImages();
    setError("");
  };

  const clearFile = () => {
    setFile(null);
    clearImages();
    setError("");
  };

  const handleConvert = async () => {
    if (!file) return;

    setLoading(true);
    clearImages();
    setError("");

    try {
      const pdfjs = await import("pdfjs-dist");

      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();

      const pdf = await pdfjs.getDocument({
        data: await file.arrayBuffer(),
      }).promise;
      const convertedImages: ConvertedImage[] = [];

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const canvasContext = canvas.getContext("2d");

        if (!canvasContext) {
          throw new Error("Canvas is not supported in this browser.");
        }

        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);

        await page.render({
          canvas,
          canvasContext,
          viewport,
        }).promise;

        const blob = await canvasToPngBlob(canvas);
        convertedImages.push({
          pageNumber,
          fileName: `page-${String(pageNumber).padStart(2, "0")}.png`,
          url: URL.createObjectURL(blob),
        });
      }

      setImages(convertedImages);
    } catch (convertError) {
      setError(getErrorMessage(convertError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12 transition-colors dark:bg-zinc-950">
      <section className="w-full max-w-2xl rounded-lg border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-2 text-center text-3xl font-bold text-zinc-950 dark:text-white">
          PDF to Images
        </h1>
        <p className="mb-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Convert each PDF page into a downloadable PNG image.
        </p>

        <FileDropzone
          label="Drop a PDF here"
          helperText="or click to choose one PDF file"
          disabled={loading}
          onFilesSelected={handleFilesSelected}
        />

        {file && (
          <div className="mt-4">
            <SelectedFileRow file={file} onRemove={clearFile} />
          </div>
        )}

        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Image quality
          </p>
          <div className="grid grid-cols-3 gap-2">
            {scaleOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setScale(option.value);
                  clearImages();
                  setError("");
                }}
                disabled={loading}
                className={`rounded-lg border px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  scale === option.value
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-zinc-300 bg-white text-zinc-700 hover:border-blue-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleConvert}
          disabled={loading || !file}
          className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Converting pages..." : "Convert to PNG"}
        </button>

        {loading && (
          <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Rendering PDF pages in your browser...
          </p>
        )}

        {error && <p className="mt-4 text-center text-sm text-red-300">{error}</p>}

        {images.length > 0 && !loading && !error && (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Converted images ({images.length})
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {images.map((image) => (
                <a
                  key={image.url}
                  href={image.url}
                  download={image.fileName}
                  className="group rounded-lg border border-zinc-200 bg-zinc-50 p-3 transition hover:border-blue-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-blue-500"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={`Page ${image.pageNumber}`}
                    className="mb-3 aspect-[3/4] w-full rounded-md border border-zinc-200 object-contain bg-white dark:border-zinc-800"
                  />
                  <span className="flex items-center justify-between gap-3 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {image.fileName}
                    <Download className="h-4 w-4 text-blue-500 transition group-hover:translate-y-0.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
