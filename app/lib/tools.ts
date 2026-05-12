import {
  FileMinus,
  FileDown,
  FileImage,
  FilePlus,
  FileQuestion,
  FileText,
  Images,
  ListOrdered,
  ListPlus,
  RotateCw,
  Scissors,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { ToolTextKey } from "./i18n";

export type ToolStatus = "available" | "coming-soon";
export type ToolCategory = "Organize" | "Convert" | "Optimize" | "AI";

export type Tool = {
  id: ToolTextKey;
  href: string;
  title: string;
  shortTitle: string;
  description: string;
  status: ToolStatus;
  category: ToolCategory;
  icon: LucideIcon;
};

export const tools: Tool[] = [
  {
    id: "merge",
    href: "/tools/merge",
    title: "Merge PDFs",
    shortTitle: "Merge",
    description: "Combine multiple PDF files into one clean document.",
    status: "available",
    category: "Organize",
    icon: FilePlus,
  },
  {
    id: "split",
    href: "/tools/split",
    title: "Split PDF",
    shortTitle: "Split",
    description: "Extract page ranges from a PDF into a new file.",
    status: "available",
    category: "Organize",
    icon: Scissors,
  },
  {
    id: "compress",
    href: "/tools/compress",
    title: "Compress PDF",
    shortTitle: "Compress",
    description: "Reduce file size by rebuilding the document structure.",
    status: "available",
    category: "Optimize",
    icon: FileDown,
  },
  {
    id: "rotate",
    href: "/tools/rotate",
    title: "Rotate PDF",
    shortTitle: "Rotate",
    description: "Rotate all pages or selected page ranges in a PDF.",
    status: "available",
    category: "Organize",
    icon: RotateCw,
  },
  {
    id: "deletePages",
    href: "/tools/delete-pages",
    title: "Delete Pages",
    shortTitle: "Delete",
    description: "Remove selected pages and download a cleaned PDF.",
    status: "available",
    category: "Organize",
    icon: FileMinus,
  },
  {
    id: "reorderPages",
    href: "/tools/reorder-pages",
    title: "Reorder Pages",
    shortTitle: "Reorder",
    description: "Build a new PDF with pages in your chosen order.",
    status: "available",
    category: "Organize",
    icon: ListOrdered,
  },
  {
    id: "pageNumbers",
    href: "/tools/page-numbers",
    title: "Add Page Numbers",
    shortTitle: "Page Numbers",
    description: "Add page numbers to every page in a PDF.",
    status: "available",
    category: "Organize",
    icon: ListPlus,
  },
  {
    id: "aiSummary",
    href: "/tools/ai-summary",
    title: "AI Summary",
    shortTitle: "AI Summary",
    description: "Extract readable text and get a concise summary.",
    status: "available",
    category: "AI",
    icon: Sparkles,
  },
  {
    id: "extractText",
    href: "/tools/extract-text",
    title: "Extract Text",
    shortTitle: "Extract Text",
    description: "Extract readable PDF text into a downloadable TXT file.",
    status: "available",
    category: "Convert",
    icon: FileText,
  },
  {
    id: "textToPdf",
    href: "/tools/text-to-pdf",
    title: "Text to PDF",
    shortTitle: "Text to PDF",
    description: "Convert typed text or TXT files into a PDF document.",
    status: "available",
    category: "Convert",
    icon: FileText,
  },
  {
    id: "pdfToImages",
    href: "/tools/pdf-to-images",
    title: "PDF to Images",
    shortTitle: "PDF to Images",
    description: "Convert PDF pages into downloadable image files.",
    status: "available",
    category: "Convert",
    icon: FileImage,
  },
  {
    id: "imagesToPdf",
    href: "/tools/images-to-pdf",
    title: "Images to PDF",
    shortTitle: "Images to PDF",
    description: "Combine JPG and PNG images into one PDF document.",
    status: "available",
    category: "Convert",
    icon: Images,
  },
  {
    id: "pdfToWord",
    href: "/tools/pdf-to-word",
    title: "PDF to Word",
    shortTitle: "PDF to Word",
    description: "Convert PDFs into editable Word documents.",
    status: "coming-soon",
    category: "Convert",
    icon: FileText,
  },
  {
    id: "wordToPdf",
    href: "/tools/word-to-pdf",
    title: "Word to PDF",
    shortTitle: "Word to PDF",
    description: "Convert Word documents into PDF files.",
    status: "coming-soon",
    category: "Convert",
    icon: FileText,
  },
  {
    id: "askPdf",
    href: "/tools/ask-pdf",
    title: "Ask PDF",
    shortTitle: "Ask PDF",
    description: "Ask questions and get answers from a PDF document.",
    status: "coming-soon",
    category: "AI",
    icon: FileQuestion,
  },
];

export const toolCategories: Array<"All" | ToolCategory> = [
  "All",
  "Organize",
  "Convert",
  "Optimize",
  "AI",
];

export const availableTools = tools.filter(
  (tool) => tool.status === "available"
);

export function getToolByHref(href: string) {
  return tools.find((tool) => tool.href === href);
}
