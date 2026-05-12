 "use client";

import ComingSoonTool from "@/app/components/ComingSoonTool";
import { getToolByHref } from "@/app/lib/tools";

export default function PdfToWordPage() {
  const tool = getToolByHref("/tools/pdf-to-word");

  if (!tool) return null;

  return <ComingSoonTool tool={tool} />;
}
