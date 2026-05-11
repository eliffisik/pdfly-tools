import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { jsonError, validatePdfFile } from "../pdf-helpers";

function parseStartNumber(value: FormDataEntryValue | null) {
  const startNumber = Number(value || 1);

  if (!Number.isInteger(startNumber) || startNumber < 1) {
    throw new Error("Start number must be a positive whole number.");
  }

  return startNumber;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const startNumber = parseStartNumber(formData.get("startNumber"));

    if (!(file instanceof File)) {
      return jsonError("PDF file is required.");
    }

    const validationError = validatePdfFile(file);
    if (validationError) return jsonError(validationError);

    const pdf = await PDFDocument.load(await file.arrayBuffer());
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const pages = pdf.getPages();

    pages.forEach((page, index) => {
      const { width } = page.getSize();
      const label = `${startNumber + index} / ${startNumber + pages.length - 1}`;
      const fontSize = 10;
      const textWidth = font.widthOfTextAtSize(label, fontSize);

      page.drawText(label, {
        x: (width - textWidth) / 2,
        y: 24,
        size: fontSize,
        font,
        color: rgb(0.32, 0.32, 0.36),
      });
    });

    const numberedBytes = await pdf.save({ useObjectStreams: true });

    return new NextResponse(Buffer.from(numberedBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="numbered.pdf"',
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return jsonError(error.message);
    }

    console.error("PAGE NUMBERS ERROR:", error);
    return jsonError("Unable to add page numbers to this PDF.", 500);
  }
}
