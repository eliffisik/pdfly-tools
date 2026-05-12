import "./globals.css";
import Footer from "./components/Footer";
import { LanguageProvider } from "./components/LanguageProvider";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import { ThemeProvider } from "./components/ThemeProvider";
import { ToastProvider } from "./components/ToastProvider";

export const metadata = {
  metadataBase: new URL("https://pdfly.tools"),
  title: {
    default: "PDFly - Fast PDF Tools",
    template: "%s | PDFly",
  },
  description:
    "Merge, split, compress, convert, and organize PDFs in a focused web workspace.",
  openGraph: {
    title: "PDFly - Fast PDF Tools",
    description:
      "A focused PDF tools workspace for merging, splitting, compressing, converting, and organizing PDFs.",
    siteName: "PDFly",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-white">
        <ThemeProvider>
          <LanguageProvider>
            <ToastProvider>
              <Navbar />
              <PageTransition>{children}</PageTransition>
              <Footer />
            </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
