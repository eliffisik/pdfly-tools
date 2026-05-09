import { NextResponse } from "next/server";

export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

export function isPdfFile(file: File) {
  return (
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
  );
}

export function validatePdfFile(file: File | null, label = "PDF") {
  if (!file) {
    return `${label} file is required.`;
  }

  if (!isPdfFile(file)) {
    return `${label} must be a PDF file.`;
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return `${label} must be smaller than 25 MB.`;
  }

  return null;
}

export function jsonError(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}
