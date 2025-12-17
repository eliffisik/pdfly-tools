"use client";

import { useState, useRef } from "react";

export default function MergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
    setMergedPdfUrl("");
  };

 const removeFile = (index: number) => {
  const updatedFiles = files.filter((_, i) => i !== index);
  setFiles(updatedFiles);

  if (updatedFiles.length === 0 && fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};


  const handleMerge = async () => {
    if (files.length < 2) return;

    setLoading(true);
    setMergedPdfUrl("");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/merge", {
        method: "POST",
        body: formData,
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (err) {
      console.error("Merge error:", err);
      alert("Birleştirme sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Merge PDFs
        </h1>

        {/* File input */}
       <input
  ref={fileInputRef}
  type="file"
  accept=".pdf"
  multiple
  onChange={handleFileChange}
  className="w-full p-3 border border-zinc-700 rounded-lg mb-4 bg-zinc-900 text-gray-200"
/>

        {/* Selected files list */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-gray-400">
              Seçilen dosyalar ({files.length})
            </p>

            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3"
              >
                <span className="text-sm text-gray-200 truncate">
                  📄 {file.name}
                </span>

                <button
                  onClick={() => removeFile(index)}
                  className="text-red-400 hover:text-red-500 text-sm"
                >
                  Kaldır
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Merge button */}
        <button
          onClick={handleMerge}
          disabled={loading || files.length < 2}
          className="mt-6 w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold
          hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "PDF'ler birleştiriliyor..." : "PDF'leri Birleştir"}
        </button>

        {/* Loading info */}
        {loading && (
          <p className="mt-4 text-sm text-gray-400 text-center">
            Lütfen bekleyin, dosyalar işleniyor...
          </p>
        )}

        {/* Download merged PDF */}
        {mergedPdfUrl && !loading && (
          <div className="mt-6 text-center">
            <a
              href={mergedPdfUrl}
              download="merged.pdf"
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Birleştirilmiş PDF’i İndir
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
