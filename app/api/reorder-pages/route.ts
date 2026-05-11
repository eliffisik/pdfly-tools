import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import { jsonError, validatePdfFile } from "../pdf-helpers";
import { parsePageRanges } from "../pdf-ranges";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const order = String(formData.get("order") || "").trim();

    if (!(file instanceof File)) {
      return jsonError("PDF file is required.");
    }

    const validationError = validatePdfFile(file);
    if (validationError) return jsonError(validationError);

    const sourcePdf = await PDFDocument.load(await file.arrayBuffer());
    const orderedPageIndices = parsePageRanges(order, sourcePdf.getPageCount(), {
      dedupe: false,
    });

    const outputPdf = await PDFDocument.create();
    const copiedPages = await outputPdf.copyPages(sourcePdf, orderedPageIndices);
    copiedPages.forEach((page) => outputPdf.addPage(page));

    const outputBytes = await outputPdf.save({ useObjectStreams: true });

    return new NextResponse(Buffer.from(outputBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="reordered.pdf"',
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return jsonError(error.message);
    }

    console.error("REORDER PAGES ERROR:", error);
    return jsonError("Unable to reorder pages in this PDF.", 500);
  }
}
