import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import { jsonError } from "../pdf-helpers";

const MAX_IMAGE_BYTES = 15 * 1024 * 1024;

function isSupportedImage(file: File) {
  return (
    file.type === "image/png" ||
    file.type === "image/jpeg" ||
    /\.(png|jpe?g)$/i.test(file.name)
  );
}

async function embedImage(pdf: PDFDocument, file: File) {
  const imageBytes = await file.arrayBuffer();

  if (file.type === "image/png" || /\.png$/i.test(file.name)) {
    return pdf.embedPng(imageBytes);
  }

  return pdf.embedJpg(imageBytes);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files").filter((file) => file instanceof File);

    if (files.length === 0) {
      return jsonError("Upload at least one JPG or PNG image.");
    }

    for (const [index, file] of files.entries()) {
      if (!isSupportedImage(file)) {
        return jsonError(`Image ${index + 1} must be a JPG or PNG file.`);
      }

      if (file.size > MAX_IMAGE_BYTES) {
        return jsonError(`Image ${index + 1} must be smaller than 15 MB.`);
      }
    }

    const pdf = await PDFDocument.create();

    for (const file of files) {
      const image = await embedImage(pdf, file);
      const page = pdf.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    const pdfBytes = await pdf.save({ useObjectStreams: true });

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="images.pdf"',
      },
    });
  } catch (error) {
    console.error("IMAGES TO PDF ERROR:", error);
    return jsonError("Unable to convert these images to PDF.", 500);
  }
}
