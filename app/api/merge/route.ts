import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import { jsonError, validatePdfFile } from "../pdf-helpers";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files").filter((file) => file instanceof File);

    if (files.length < 2) {
      return jsonError("Upload at least 2 PDF files.");
    }

    for (const [index, file] of files.entries()) {
      const validationError = validatePdfFile(file, `File ${index + 1}`);
      if (validationError) return jsonError(validationError);
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save({ useObjectStreams: true });

    return new NextResponse(Buffer.from(mergedBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="merged.pdf"',
      },
    });
  } catch (error) {
    console.error("MERGE ERROR:", error);
    return jsonError("Unable to merge this PDF set.", 500);
  }
}
