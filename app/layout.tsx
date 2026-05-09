import "./globals.css";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";

export const metadata = {
  title: "PDFly",
  description: "Fast PDF tools for merging, compressing, and summarizing PDFs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
