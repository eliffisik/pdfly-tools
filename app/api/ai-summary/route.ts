import { NextResponse } from "next/server";
import OpenAI from "openai";
import PDFParser from "pdf2json";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "PDF bulunamadı" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

 
    const text = await new Promise<string>((resolve, reject) => {
      const parser = new PDFParser();

      parser.on("pdfParser_dataError", (errData: any) => {
        reject(errData.parserError);
      });

      parser.on("pdfParser_dataReady", (pdfData: any) => {
        let rawText = "";
        pdfData.Pages.forEach((page: any) => {
          page.Texts.forEach((t: any) => {
            rawText += decodeURIComponent(t.R[0].T) + " ";
          });
          rawText += "\n";
        });
        resolve(rawText);
      });

      parser.parseBuffer(buffer);
    });

    if (!text.trim()) {
      return NextResponse.json(
        { error: "PDF içinde okunabilir metin bulunamadı." },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Metin özetleme asistanısın." },
        {
          role: "user",
          content: `Bu PDF içeriğini kısa ve net bir şekilde özetle:\n\n${text}`,
        },
      ],
    });

    const summary = completion.choices[0].message.content;

    return NextResponse.json({ summary });
  } catch (err: any) {
    console.error("AI SUMMARY ERROR:", err);
    return NextResponse.json(
      { error: "Özet çıkarma başarısız oldu", details: err.message },
      { status: 500 }
    );
  }
}
