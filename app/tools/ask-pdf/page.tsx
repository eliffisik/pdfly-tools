 "use client";

import ComingSoonTool from "@/app/components/ComingSoonTool";
import { getToolByHref } from "@/app/lib/tools";

export default function AskPdfPage() {
  const tool = getToolByHref("/tools/ask-pdf");

  if (!tool) return null;

  return <ComingSoonTool tool={tool} />;
}
