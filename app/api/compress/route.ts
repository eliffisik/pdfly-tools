import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import { jsonError, validatePdfFile } from "../pdf-helpers";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return jsonError("PDF file is required.");
    }

    const validationError = validatePdfFile(file);
    if (validationError) return jsonError(validationError);

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const compressedPdf = await PDFDocument.create();
    const pages = await compressedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => compressedPdf.addPage(page));

    const compressedBytes = await compressedPdf.save({ useObjectStreams: true });

    return new NextResponse(Buffer.from(compressedBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="compressed.pdf"',
      },
    });
  } catch (error) {
    console.error("COMPRESSION ERROR:", error);
    return jsonError("Unable to compress this PDF.", 500);
  }
}
