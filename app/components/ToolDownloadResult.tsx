import { Download } from "lucide-react";

type ToolDownloadResultProps = {
  href: string;
  download: string;
  label: string;
};

export default function ToolDownloadResult({
  href,
  download,
  label,
}: ToolDownloadResultProps) {
  return (
    <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center dark:border-emerald-950 dark:bg-emerald-950/30">
      <a
        href={href}
        download={download}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
      >
        <Download className="h-4 w-4" />
        {label}
      </a>
    </div>
  );
}
