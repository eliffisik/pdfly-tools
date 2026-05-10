import ComingSoonTool from "@/app/components/ComingSoonTool";
import { getToolByHref } from "@/app/lib/tools";

export default function PdfToImagesPage() {
  const tool = getToolByHref("/tools/pdf-to-images");

  if (!tool) return null;

  return <ComingSoonTool tool={tool} />;
}
