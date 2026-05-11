import PDFParser from "pdf2json";

type PdfTextRun = {
  R?: Array<{ T?: string }>;
};

type PdfPage = {
  Texts?: PdfTextRun[];
};

type ParsedPdf = {
  Pages?: PdfPage[];
};

function safeDecodePdfText(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function extractTextFromPdf(buffer: Buffer) {
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
            .map((textRun) => safeDecodePdfText(textRun.R?.[0]?.T || ""))
            .join(" ")
        )
        .join("\n");

      resolve(rawText);
    });

    parser.parseBuffer(buffer);
  });
}
