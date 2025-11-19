"use client";

import { useState } from "react";

export default function MergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert("Lütfen en az 2 PDF dosyası seçin.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const res = await fetch("/api/merge", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    setMergedPdfUrl(url);
    setLoading(false);
  };

  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Merge PDFs</h1>

      {/* File input */}
      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleFileChange}
        className="w-full p-3 border rounded mb-4"
      />

      {files.length > 0 && (
        <ul className="mb-4 text-gray-700">
          {files.map((f, i) => (
            <li key={i}>📄 {f.name}</li>
          ))}
        </ul>
      )}

      <button
        onClick={handleMerge}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Birleştiriliyor..." : "PDF'leri Birleştir"}
      </button>

      {/* Download merged PDF */}
      {mergedPdfUrl && (
        <div className="mt-6">
          <a
            href={mergedPdfUrl}
            download="merged.pdf"
            className="px-6 py-3 bg-green-600 text-white rounded shadow hover:bg-green-700"
          >
            Birleştirilmiş PDF'i İndir
          </a>
        </div>
      )}
    </main>
  );
}
