# PDFly

PDFly is a full-stack PDF tools MVP built with Next.js. It provides everyday PDF workflows such as merging, splitting, compressing, rotating, deleting pages, reordering pages, converting PDFs to images, converting images to PDF, and summarizing text-based PDFs with AI.

## Features

- Merge multiple PDFs into one document
- Split selected page ranges into a new PDF
- Compress PDFs by rebuilding document structure with object streams
- Rotate all pages or selected page ranges
- Delete selected pages from a PDF
- Reorder pages with custom page order input
- Convert PDF pages to PNG images in the browser
- Convert JPG and PNG images into a PDF
- Summarize text-based PDFs with OpenAI
- Light and dark theme support
- Searchable tools catalog
- Privacy and security notes for file processing

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- pdf-lib
- pdfjs-dist
- pdf2json
- OpenAI API
- lucide-react
- framer-motion


## Scripts

```bash
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
npm.cmd run start
```

## AI Summary Notes

AI Summary requires `OPENAI_API_KEY`. It extracts readable text from the uploaded PDF and sends that text to OpenAI for summarization. If the OpenAI account has no API quota or billing is not configured, the app will return a quota or rate limit error.

## Privacy Notes

Non-AI PDF tools process uploaded files only for the requested action and do not store files in the application. Generated files are returned directly to the browser. AI Summary is different because extracted PDF text is sent to OpenAI.

See `/privacy` in the app for the user-facing privacy and security summary.

## Roadmap

- Ask PDF chat workflow
- OCR for scanned PDFs
- Stronger compression engine
- Batch downloads as ZIP
- Deployment and custom domain
- Demo screenshots and smoke tests
