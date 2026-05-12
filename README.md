# PDFly

PDFly is a full-stack PDF tools MVP built with Next.js. It provides everyday PDF workflows such as merging, splitting, compressing, rotating, deleting pages, reordering pages, converting PDFs to images, converting images to PDF, and summarizing text-based PDFs with AI.

## Features

- Merge multiple PDFs into one document
- Split selected page ranges into a new PDF
- Compress PDFs by rebuilding document structure with object streams
- Rotate all pages or selected page ranges
- Delete selected pages from a PDF
- Reorder pages with custom page order input
- Add page numbers to PDFs
- Extract readable PDF text into TXT
- Convert typed text or TXT files into PDF
- Convert PDF pages to PNG images in the browser
- Convert JPG and PNG images into a PDF
- Summarize text-based PDFs with OpenAI
- Light and dark theme support
- English and Turkish language support
- Toast notifications for success and error states
- Searchable tools catalog
- Privacy and security notes for file processing
- SEO metadata for the main pages and tool routes

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

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Add `OPENAI_API_KEY` only if you want to use AI Summary. The non-AI PDF tools work without an API key.

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## AI Summary Notes

AI Summary requires `OPENAI_API_KEY`. It extracts readable text from the uploaded PDF and sends that text to OpenAI for summarization. If the OpenAI account has no API quota or billing is not configured, the app will return a quota or rate limit error.

## Privacy Notes

Non-AI PDF tools process uploaded files only for the requested action and do not store files in the application. Generated files are returned directly to the browser. AI Summary is different because extracted PDF text is sent to OpenAI.

See `/privacy` in the app for the user-facing privacy and security summary.

## Deployment

PDFly is ready to deploy on Vercel.

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add `OPENAI_API_KEY` in Vercel Environment Variables if AI Summary should be enabled.
4. Deploy.

For a production domain, update `metadataBase` in `app/layout.tsx` from the placeholder URL to the real domain.

## Roadmap

- Ask PDF chat workflow
- OCR for scanned PDFs
- Stronger compression engine
- Batch downloads as ZIP
- Deployment and custom domain
- Demo screenshots and smoke tests
