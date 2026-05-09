import { NextResponse } from "next/server";
import OpenAI from "openai";
import PDFParser from "pdf2json";
import { jsonError, validatePdfFile } from "../pdf-helpers";

const MAX_SUMMARY_INPUT_CHARS = 12000;

type PdfTextRun = {
  R?: Array<{ T?: string }>;
};

type PdfPage = {
  Texts?: PdfTextRun[];
};

type ParsedPdf = {
  Pages?: PdfPage[];
};

function extractTextFromPdf(buffer: Buffer) {
  return new Promise<string>((resolve, reject) => {
    const parser = new PDFParser();

    parser.on("pdfParser_dataError", (errorData: unknown) => {
      reject(errorData);
    });

    parser.on("pdfParser_dataReady", (pdfData: ParsedPdf) => {
      const pages = pdfData.Pages || [];
      const rawText = pages
        .map((page) =>
          (page.Texts || [])
            .map((textRun) => decodeURIComponent(textRun.R?.[0]?.T || ""))
            .join(" ")
        )
        .join("\n");

      resolve(rawText);
    });

    parser.parseBuffer(buffer);
  });
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return jsonError("OPENAI_API_KEY is not configured.", 500);
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return jsonError("PDF file is required.");
    }

    const validationError = validatePdfFile(file);
    if (validationError) return jsonError(validationError);

    const buffer = Buffer.from(await file.arrayBuffer());
    const text = await extractTextFromPdf(buffer);
    const trimmedText = text.trim();

    if (!trimmedText) {
      return jsonError("No readable text was found in this PDF.");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You summarize PDF text clearly. Keep summaries concise, factual, and easy to scan.",
        },
        {
          role: "user",
          content: `Summarize this PDF content:\n\n${trimmedText.slice(
            0,
            MAX_SUMMARY_INPUT_CHARS
          )}`,
        },
      ],
    });

    return NextResponse.json({
      summary: completion.choices[0]?.message.content || "",
    });
  } catch (error) {
    console.error("AI SUMMARY ERROR:", error);
    return jsonError("Unable to summarize this PDF.", 500);
  }
}
