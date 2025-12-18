"use client";

import { useRef, useState } from "react";

export default function CompressPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [compressedUrl, setCompressedUrl] = useState("");
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0] || null);
    setCompressedUrl("");
    setError("");
  };

  const clearFile = () => {
    setFile(null);
    setCompressedUrl("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCompress = async () => {
    if (!file) return;

    setLoading(true);
    setError("");
    setCompressedUrl("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/compress", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Sıkıştırma başarısız oldu.");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setCompressedUrl(url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Compress PDF
        </h1>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full p-3 border border-zinc-700 rounded-lg mb-4 bg-zinc-900 text-gray-200"
        />

        {file && (
          <div className="mt-4 flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3">
            <span className="text-sm text-gray-200 truncate">📄 {file.name}</span>
            <button
              onClick={clearFile}
              className="text-red-400 hover:text-red-500 text-sm"
            >
              Kaldır
            </button>
          </div>
        )}

        <button
          onClick={handleCompress}
          disabled={loading || !file}
          className="mt-6 w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold
          hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sıkıştırılıyor..." : "PDF'i Sıkıştır"}
        </button>

        {loading && (
          <p className="mt-4 text-sm text-gray-400 text-center">
            Lütfen bekleyin, dosya işleniyor...
          </p>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-400 text-center">{error}</p>
        )}

        {compressedUrl && !loading && !error && (
          <div className="mt-6 text-center">
            <a
              href={compressedUrl}
              download="compressed.pdf"
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Sıkıştırılmış PDF’i İndir
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
