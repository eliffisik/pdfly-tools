import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "PDF bulunamadı" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);

  // Yeni PDF oluştur
  const compressedPdf = await PDFDocument.create();

  // Tüm sayfaları kopyala (yeniden encode ederek boyutu küçültüyor)
  const pages = await compressedPdf.copyPages(pdf, pdf.getPageIndices());
  pages.forEach((page) => compressedPdf.addPage(page));

  // PDF'i kaydet
  const compressedBytes = await compressedPdf.save({ useObjectStreams: true });

  return new NextResponse(Buffer.from(compressedBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="compressed.pdf"',
    },
  });
}
