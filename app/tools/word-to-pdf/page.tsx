 "use client";

import ComingSoonTool from "@/app/components/ComingSoonTool";
import { getToolByHref } from "@/app/lib/tools";

export default function WordToPdfPage() {
  const tool = getToolByHref("/tools/word-to-pdf");

  if (!tool) return null;

  return <ComingSoonTool tool={tool} />;
}
