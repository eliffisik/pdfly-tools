const sections = [
  {
    title: "File Processing",
    body: "PDFly processes uploaded files only for the action you request. Non-AI tools such as merge, split, rotate, delete pages, reorder pages, and image conversion do not store uploaded files in the application.",
  },
  {
    title: "AI Summary",
    body: "AI Summary extracts readable text from your PDF and sends that extracted text to OpenAI to generate a summary. Do not use AI Summary for files that contain sensitive, confidential, or regulated information unless you are comfortable with that processing.",
  },
  {
    title: "Temporary Data",
    body: "Generated download files are returned directly to your browser. The current app does not provide accounts, file history, or long-term file storage.",
  },
  {
    title: "Local Development",
    body: "When running locally, your environment variables such as OPENAI_API_KEY stay on your machine and should not be committed to GitHub.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-white">
      <section className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
          Trust & safety
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Privacy and security
        </h1>
        <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
          PDFly is designed as a focused PDF tools workspace. This page explains
          what happens to files during processing and where AI features differ
          from regular PDF tools.
        </p>
      </section>

      <section className="mx-auto mt-10 grid max-w-3xl gap-4">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
              {section.body}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
