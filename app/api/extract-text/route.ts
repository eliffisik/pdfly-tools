import { NextResponse } from "next/server";
import { jsonError, validatePdfFile } from "../pdf-helpers";
import { extractTextFromPdf } from "../pdf-text";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return jsonError("PDF file is required.");
    }

    const validationError = validatePdfFile(file);
    if (validationError) return jsonError(validationError);

    const text = await extractTextFromPdf(Buffer.from(await file.arrayBuffer()));
    const trimmedText = text.trim();

    if (!trimmedText) {
      return jsonError("No readable text was found in this PDF.");
    }

    return new NextResponse(trimmedText, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": 'attachment; filename="extracted-text.txt"',
      },
    });
  } catch (error) {
    console.error("EXTRACT TEXT ERROR:", error);
    return jsonError("Unable to extract text from this PDF.", 500);
  }
}
