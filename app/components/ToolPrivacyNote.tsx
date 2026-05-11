type ToolPrivacyNoteProps = {
  ai?: boolean;
};

export default function ToolPrivacyNote({ ai = false }: ToolPrivacyNoteProps) {
  return (
    <p className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-800 dark:border-blue-950 dark:bg-blue-950/30 dark:text-blue-200">
      {ai
        ? "Privacy note: this tool extracts text from your PDF and sends that text to OpenAI for summarization. Uploaded files are not stored by PDFly."
        : "Privacy note: files are processed temporarily for this action and are not stored by PDFly."}
    </p>
  );
}
