import {
  FileDown,
  FileImage,
  FilePlus,
  FileQuestion,
  RotateCw,
  Scissors,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type ToolStatus = "available" | "coming-soon";

export type Tool = {
  href: string;
  title: string;
  shortTitle: string;
  description: string;
  status: ToolStatus;
  icon: LucideIcon;
};

export const tools: Tool[] = [
  {
    href: "/tools/merge",
    title: "Merge PDFs",
    shortTitle: "Merge",
    description: "Combine multiple PDF files into one clean document.",
    status: "available",
    icon: FilePlus,
  },
  {
    href: "/tools/split",
    title: "Split PDF",
    shortTitle: "Split",
    description: "Extract page ranges from a PDF into a new file.",
    status: "available",
    icon: Scissors,
  },
  {
    href: "/tools/compress",
    title: "Compress PDF",
    shortTitle: "Compress",
    description: "Reduce file size by rebuilding the document structure.",
    status: "available",
    icon: FileDown,
  },
  {
    href: "/tools/rotate",
    title: "Rotate PDF",
    shortTitle: "Rotate",
    description: "Rotate all pages or selected page ranges in a PDF.",
    status: "available",
    icon: RotateCw,
  },
  {
    href: "/tools/ai-summary",
    title: "AI Summary",
    shortTitle: "AI Summary",
    description: "Extract readable text and get a concise summary.",
    status: "available",
    icon: Sparkles,
  },
  {
    href: "/tools/pdf-to-images",
    title: "PDF to Images",
    shortTitle: "PDF to Images",
    description: "Convert PDF pages into downloadable image files.",
    status: "available",
    icon: FileImage,
  },
  {
    href: "/tools/ask-pdf",
    title: "Ask PDF",
    shortTitle: "Ask PDF",
    description: "Ask questions and get answers from a PDF document.",
    status: "coming-soon",
    icon: FileQuestion,
  },
];

export const availableTools = tools.filter(
  (tool) => tool.status === "available"
);

export function getToolByHref(href: string) {
  return tools.find((tool) => tool.href === href);
}
