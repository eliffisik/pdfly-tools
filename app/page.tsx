export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold text-blue-600 tracking-tight">
          PDFly
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Fast & Smart PDF Tools — Merge, Compress, and Summarize with AI.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/tools/merge"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Merge PDFs
          </a>
          <a
            href="/tools/compress"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Compress PDF
          </a>
          <a
            href="/tools/ai-summary"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            AI Summary
          </a>
        </div>
      </section>

      {/* Tools Section */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-md">
          <h3 className="text-xl font-semibold mb-2">Merge PDFs</h3>
          <p className="text-gray-600">
            Combine multiple PDF files into one clean document.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow hover:shadow-md">
          <h3 className="text-xl font-semibold mb-2">Compress PDF</h3>
          <p className="text-gray-600">
            Reduce file size without losing quality.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow hover:shadow-md">
          <h3 className="text-xl font-semibold mb-2">AI Summary</h3>
          <p className="text-gray-600">
            Extract and summarize long PDFs with AI in seconds.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-white border-t text-center text-gray-500">
        <p>© {new Date().getFullYear()} PDFly — Made by Elif Isik</p>
      </footer>
    </main>
  );
}
