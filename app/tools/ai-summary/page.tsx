"use client";

import { useState } from "react";

export default function AISummaryPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const handleSummary = async () => {
    if (!file) {
      alert("Lütfen bir PDF seçin.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/ai-summary", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">AI Summary</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="w-full p-3 border rounded mb-4"
      />

      <button
        onClick={handleSummary}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Özetleniyor..." : "PDF'i Özetle"}
      </button>

      {summary && (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">AI Summary</h2>
          <p className="text-gray-800 whitespace-pre-line">{summary}</p>
        </div>
      )}
    </main>
  );
}
