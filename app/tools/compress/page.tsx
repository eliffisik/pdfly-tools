"use client";

import { useState } from "react";

export default function CompressPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [compressedUrl, setCompressedUrl] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const handleCompress = async () => {
    if (!file) {
      alert("Lütfen bir PDF seçin.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/compress", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    setCompressedUrl(url);
    setLoading(false);
  };

  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Compress PDF</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="w-full p-3 border rounded mb-4"
      />

      <button
        onClick={handleCompress}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Sıkıştırılıyor..." : "PDF'i Sıkıştır"}
      </button>

      {compressedUrl && (
        <div className="mt-6">
          <a
            href={compressedUrl}
            download="compressed.pdf"
            className="px-6 py-3 bg-green-600 text-white rounded shadow hover:bg-green-700"
          >
            Sıkıştırılmış PDF'i İndir
          </a>
        </div>
      )}
    </main>
  );
}
