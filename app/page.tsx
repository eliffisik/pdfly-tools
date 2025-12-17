import { FilePlus, FileDown, Sparkles } from "lucide-react";


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

         
      </section>

      {/* Tools Section */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-6">
         <a
    href="/tools/merge"
    className="group p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
  >
        <FilePlus className="w-8 h-8 text-blue-600 mb-4 group-hover:scale-110 transition" />
          <h3 className="text-xl font-semibold mb-2">Merge PDFs</h3>
          <p className="text-gray-600">
            Combine multiple PDF files into one clean document.
          </p>
        </a>

       <a
    href="/tools/compress"
    className="group p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
  >
           <FileDown className="w-8 h-8 text-blue-600 mb-4 group-hover:scale-110 transition" />
          <h3 className="text-xl font-semibold mb-2">Compress PDF</h3>
          <p className="text-gray-600">
            Reduce file size without losing quality.
          </p>
        </a>

       <a
    href="/tools/ai-summary"
    className="group p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
  >
           <Sparkles className="w-8 h-8 text-blue-600 mb-4 group-hover:scale-110 transition" />
          <h3 className="text-xl font-semibold mb-2">AI Summary</h3>
          <p className="text-gray-600">
            Extract and summarize long PDFs with AI in seconds.
          </p>
        </a>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-white border-t text-center text-gray-500">
        <p>© {new Date().getFullYear()} PDFly — Made by Elif Isik</p>
      </footer>
    </main>
  );
}
