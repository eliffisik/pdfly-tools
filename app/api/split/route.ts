import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import { jsonError, validatePdfFile } from "../pdf-helpers";

function parsePageRanges(input: string, pageCount: number) {
  const parts = input
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const pages: number[] = [];

  if (parts.length === 0) {
    throw new Error("Enter at least one page or page range.");
  }

  for (const part of parts) {
    const match = part.match(/^(\d+)(?:-(\d+))?$/);

    if (!match) {
      throw new Error("Use page ranges like 1-3,5,8-10.");
    }

    const start = Number(match[1]);
    const end = match[2] ? Number(match[2]) : start;

    if (start < 1 || end < 1 || start > end) {
      throw new Error("Page ranges must start at 1 and move forward.");
    }

    if (end > pageCount) {
      throw new Error(`This PDF has ${pageCount} page(s).`);
    }

    for (let page = start; page <= end; page += 1) {
      pages.push(page - 1);
    }
  }

  return [...new Set(pages)];
}

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
