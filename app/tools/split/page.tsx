import ComingSoonTool from "@/app/components/ComingSoonTool";
import { getToolByHref } from "@/app/lib/tools";

export default function SplitPage() {
  const tool = getToolByHref("/tools/split");

  if (!tool) return null;

  return <ComingSoonTool tool={tool} />;
}
