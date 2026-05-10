import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import { parsePageRanges } from "../pdf-ranges";
import { jsonError, validatePdfFile } from "../pdf-helpers";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const ranges = String(formData.get("ranges") || "").trim();

    if (!(file instanceof File)) {
      return jsonError("PDF file is required.");
    }

    const validationError = validatePdfFile(file);
    if (validationError) return jsonError(validationError);

    const sourcePdf = await PDFDocument.load(await file.arrayBuffer());
    const selectedPageIndices = parsePageRanges(ranges, sourcePdf.getPageCount());
    const splitPdf = await PDFDocument.create();
    const pages = await splitPdf.copyPages(sourcePdf, selectedPageIndices);

    pages.forEach((page) => splitPdf.addPage(page));

    const splitBytes = await splitPdf.save({ useObjectStreams: true });

    return new NextResponse(Buffer.from(splitBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="split.pdf"',
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return jsonError(error.message);
    }

    console.error("SPLIT ERROR:", error);
    return jsonError("Unable to split this PDF.", 500);
  }
}
