import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import { jsonError, validatePdfFile } from "../pdf-helpers";
import { parsePageRanges } from "../pdf-ranges";

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
    const pageCount = sourcePdf.getPageCount();
    const pagesToDelete = new Set(parsePageRanges(ranges, pageCount));
    const pagesToKeep = sourcePdf
      .getPageIndices()
      .filter((pageIndex) => !pagesToDelete.has(pageIndex));

    if (pagesToKeep.length === 0) {
      return jsonError("At least one page must remain in the PDF.");
    }

    const outputPdf = await PDFDocument.create();
    const copiedPages = await outputPdf.copyPages(sourcePdf, pagesToKeep);
    copiedPages.forEach((page) => outputPdf.addPage(page));

    const outputBytes = await outputPdf.save({ useObjectStreams: true });

    return new NextResponse(Buffer.from(outputBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="deleted-pages.pdf"',
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return jsonError(error.message);
    }

    console.error("DELETE PAGES ERROR:", error);
    return jsonError("Unable to delete pages from this PDF.", 500);
  }
}
