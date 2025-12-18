"use client";

import { useRef, useState } from "react";

export default function AISummaryPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0] || null);
    setSummary("");
    setError("");
  };

  const clearFile = () => {
    setFile(null);
    setSummary("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSummary = async () => {
    if (!file) return;

    setLoading(true);
    setSummary("");
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/ai-summary", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Özet çıkarma başarısız oldu.");
      }

      setSummary(data.summary || "");
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
          AI Summary
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
          onClick={handleSummary}
          disabled={loading || !file}
          className="mt-6 w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold
          hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Özetleniyor..." : "PDF'i Özetle"}
        </button>

        {loading && (
          <p className="mt-4 text-sm text-gray-400 text-center">
            PDF analiz ediliyor, lütfen bekleyin...
          </p>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-400 text-center">{error}</p>
        )}

        {summary && !loading && !error && (
          <div className="mt-6 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-100 mb-2">
              Summary
            </h2>
            <p className="text-gray-200 whitespace-pre-line">{summary}</p>
          </div>
        )}
      </div>
    </main>
  );
}
