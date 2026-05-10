import { NextResponse } from "next/server";
import { degrees, PDFDocument } from "pdf-lib";
import { jsonError, validatePdfFile } from "../pdf-helpers";
import { parsePageRanges } from "../pdf-ranges";

const allowedAngles = new Set([90, 180, 270]);

function parseRotationAngle(value: FormDataEntryValue | null) {
  const angle = Number(value);

  if (!allowedAngles.has(angle)) {
    throw new Error("Choose a rotation angle: 90, 180, or 270.");
  }

  return angle;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const ranges = String(formData.get("ranges") || "").trim();
    const angle = parseRotationAngle(formData.get("angle"));

    if (!(file instanceof File)) {
      return jsonError("PDF file is required.");
    }

    const validationError = validatePdfFile(file);
    if (validationError) return jsonError(validationError);

    const pdf = await PDFDocument.load(await file.arrayBuffer());
    const pageIndices = parsePageRanges(ranges, pdf.getPageCount(), {
      allowEmpty: true,
    });

    for (const pageIndex of pageIndices) {
      const page = pdf.getPage(pageIndex);
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees((currentRotation + angle) % 360));
    }

    const rotatedBytes = await pdf.save({ useObjectStreams: true });

    return new NextResponse(Buffer.from(rotatedBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="rotated.pdf"',
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return jsonError(error.message);
    }

    console.error("ROTATE ERROR:", error);
    return jsonError("Unable to rotate this PDF.", 500);
  }
}
