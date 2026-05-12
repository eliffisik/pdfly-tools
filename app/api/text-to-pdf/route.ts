import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { jsonError } from "../pdf-helpers";

const MAX_TEXT_CHARS = 60000;
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 56;
const FONT_SIZE = 11;
const LINE_HEIGHT = 16;

function wrapLine(line: string, maxWidth: number, font: { widthOfTextAtSize: (text: string, size: number) => number }) {
  const words = line.split(/\s+/);
  const wrappedLines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (font.widthOfTextAtSize(nextLine, FONT_SIZE) <= maxWidth) {
      currentLine = nextLine;
      continue;
    }

    if (currentLine) wrappedLines.push(currentLine);

    if (font.widthOfTextAtSize(word, FONT_SIZE) <= maxWidth) {
      currentLine = word;
    } else {
      currentLine = "";
      let chunk = "";

      for (const character of word) {
        const nextChunk = `${chunk}${character}`;
        if (font.widthOfTextAtSize(nextChunk, FONT_SIZE) <= maxWidth) {
          chunk = nextChunk;
        } else {
          if (chunk) wrappedLines.push(chunk);
          chunk = character;
        }
      }

      currentLine = chunk;
    }
  }

  if (currentLine) wrappedLines.push(currentLine);
  return wrappedLines.length > 0 ? wrappedLines : [""];
}

function normalizeText(input: string) {
  return input.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const typedText = String(formData.get("text") || "");
    const file = formData.get("file");
    const fileText = file instanceof File ? await file.text() : "";
    const text = normalizeText(typedText || fileText);

    if (!text) {
      return jsonError("Enter text or upload a TXT file.");
    }

    if (text.length > MAX_TEXT_CHARS) {
      return jsonError("Text must be shorter than 60,000 characters.");
    }

    const pdf = await PDFDocument.create();
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const maxWidth = PAGE_WIDTH - MARGIN * 2;
    let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    let y = PAGE_HEIGHT - MARGIN;

    const sourceLines = text.split("\n");

    for (const sourceLine of sourceLines) {
      const wrappedLines = wrapLine(sourceLine, maxWidth, font);

      for (const line of wrappedLines) {
        if (y < MARGIN) {
          page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
          y = PAGE_HEIGHT - MARGIN;
        }

        page.drawText(line, {
          x: MARGIN,
          y,
          size: FONT_SIZE,
          font,
          color: rgb(0.18, 0.18, 0.2),
        });
        y -= LINE_HEIGHT;
      }

      y -= LINE_HEIGHT / 2;
    }

    const pdfBytes = await pdf.save({ useObjectStreams: true });

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="text.pdf"',
      },
    });
  } catch (error) {
    console.error("TEXT TO PDF ERROR:", error);
    return jsonError("Unable to convert this text to PDF.", 500);
  }
}
