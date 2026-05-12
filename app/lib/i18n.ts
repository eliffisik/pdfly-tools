export type Locale = "en" | "tr";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  tr: "TR",
};

export const dictionaries = {
  en: {
    nav: {
      home: "Home",
      tools: "Tools",
      pdfTools: "PDF Tools",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    footer: {
      copyright: "Copyright",
      madeBy: "Made by Elif Isik.",
      tools: "Tools",
      privacy: "Privacy",
    },
    home: {
      eyebrow: "Fast PDF tools for everyday work",
      description:
        "Merge, compress, and summarize PDFs from a focused web workspace. Built to grow into a polished iLovePDF-style product.",
    },
    toolsPage: {
      eyebrow: "Tool catalog",
      title: "PDF tools",
      description:
        "A focused set of PDF workflows. Available tools are ready to use; upcoming tools are already placed in the product structure.",
      search: "Search PDF tools",
      empty: "No tools match your filters.",
    },
    filters: {
      all: "All",
      available: "Available",
      comingSoon: "Coming soon",
      soon: "Soon",
    },
    categories: {
      All: "All",
      Organize: "Organize",
      Convert: "Convert",
      Optimize: "Optimize",
      AI: "AI",
    },
    comingSoon: {
      eyebrow: "Coming soon",
      allTools: "All tools",
      suffix:
        "This tool is part of the product skeleton and will be implemented after the core flows are stable.",
    },
  },
  tr: {
    nav: {
      home: "Ana Sayfa",
      tools: "Araçlar",
      pdfTools: "PDF Araçları",
      openMenu: "Menüyü aç",
      closeMenu: "Menüyü kapat",
    },
    footer: {
      copyright: "Telif hakkı",
      madeBy: "Elif Isik tarafından geliştirildi.",
      tools: "Araçlar",
      privacy: "Gizlilik",
    },
    home: {
      eyebrow: "Günlük işler için hızlı PDF araçları",
      description:
        "PDF'leri birleştirmek, sıkıştırmak ve özetlemek için odaklı bir web çalışma alanı. Zamanla iLovePDF benzeri güçlü bir ürüne dönüşecek şekilde geliştirildi.",
    },
    toolsPage: {
      eyebrow: "Araç kataloğu",
      title: "PDF araçları",
      description:
        "Odaklı PDF iş akışları. Kullanılabilir araçlar hazır; yakında gelecek araçlar da ürün iskeletinde yerini aldı.",
      search: "PDF araçlarında ara",
      empty: "Filtrelere uyan araç bulunamadı.",
    },
    filters: {
      all: "Tümü",
      available: "Hazır",
      comingSoon: "Yakında",
      soon: "Yakında",
    },
    categories: {
      All: "Tümü",
      Organize: "Düzenle",
      Convert: "Dönüştür",
      Optimize: "Optimize Et",
      AI: "AI",
    },
    comingSoon: {
      eyebrow: "Yakında",
      allTools: "Tüm araçlar",
      suffix:
        "Bu araç ürün iskeletinin bir parçası ve temel akışlar oturduktan sonra geliştirilecek.",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export const toolText = {
  en: {
    merge: {
      title: "Merge PDFs",
      shortTitle: "Merge",
      description: "Combine multiple PDF files into one clean document.",
    },
    split: {
      title: "Split PDF",
      shortTitle: "Split",
      description: "Extract page ranges from a PDF into a new file.",
    },
    compress: {
      title: "Compress PDF",
      shortTitle: "Compress",
      description: "Reduce file size by rebuilding the document structure.",
    },
    rotate: {
      title: "Rotate PDF",
      shortTitle: "Rotate",
      description: "Rotate all pages or selected page ranges in a PDF.",
    },
    deletePages: {
      title: "Delete Pages",
      shortTitle: "Delete",
      description: "Remove selected pages and download a cleaned PDF.",
    },
    reorderPages: {
      title: "Reorder Pages",
      shortTitle: "Reorder",
      description: "Build a new PDF with pages in your chosen order.",
    },
    pageNumbers: {
      title: "Add Page Numbers",
      shortTitle: "Page Numbers",
      description: "Add page numbers to every page in a PDF.",
    },
    aiSummary: {
      title: "AI Summary",
      shortTitle: "AI Summary",
      description: "Extract readable text and get a concise summary.",
    },
    extractText: {
      title: "Extract Text",
      shortTitle: "Extract Text",
      description: "Extract readable PDF text into a downloadable TXT file.",
    },
    pdfToImages: {
      title: "PDF to Images",
      shortTitle: "PDF to Images",
      description: "Convert PDF pages into downloadable image files.",
    },
    imagesToPdf: {
      title: "Images to PDF",
      shortTitle: "Images to PDF",
      description: "Combine JPG and PNG images into one PDF document.",
    },
    textToPdf: {
      title: "Text to PDF",
      shortTitle: "Text to PDF",
      description: "Convert typed text or TXT files into a PDF document.",
    },
    pdfToWord: {
      title: "PDF to Word",
      shortTitle: "PDF to Word",
      description: "Convert PDFs into editable Word documents.",
    },
    wordToPdf: {
      title: "Word to PDF",
      shortTitle: "Word to PDF",
      description: "Convert Word documents into PDF files.",
    },
    askPdf: {
      title: "Ask PDF",
      shortTitle: "Ask PDF",
      description: "Ask questions and get answers from a PDF document.",
    },
  },
  tr: {
    merge: {
      title: "PDF Birleştir",
      shortTitle: "Birleştir",
      description: "Birden fazla PDF dosyasını tek temiz belgede birleştir.",
    },
    split: {
      title: "PDF Böl",
      shortTitle: "Böl",
      description: "Seçilen sayfa aralıklarını yeni bir PDF olarak çıkar.",
    },
    compress: {
      title: "PDF Sıkıştır",
      shortTitle: "Sıkıştır",
      description: "Belge yapısını yeniden oluşturarak dosya boyutunu azalt.",
    },
    rotate: {
      title: "PDF Döndür",
      shortTitle: "Döndür",
      description: "Tüm sayfaları veya seçili sayfa aralıklarını döndür.",
    },
    deletePages: {
      title: "Sayfa Sil",
      shortTitle: "Sil",
      description: "Seçilen sayfaları kaldır ve temizlenmiş PDF'i indir.",
    },
    reorderPages: {
      title: "Sayfaları Sırala",
      shortTitle: "Sırala",
      description: "Sayfaları istediğin sıraya göre yeni bir PDF'e dönüştür.",
    },
    pageNumbers: {
      title: "Sayfa Numarası Ekle",
      shortTitle: "Numaralar",
      description: "PDF'teki her sayfaya sayfa numarası ekle.",
    },
    aiSummary: {
      title: "AI Özet",
      shortTitle: "AI Özet",
      description: "PDF metnini çıkar ve kısa, net bir özet oluştur.",
    },
    extractText: {
      title: "Metin Çıkar",
      shortTitle: "Metin Çıkar",
      description: "PDF'teki okunabilir metni indirilebilir TXT dosyasına çıkar.",
    },
    pdfToImages: {
      title: "PDF'ten Görsele",
      shortTitle: "PDF Görsel",
      description: "PDF sayfalarını indirilebilir görsellere dönüştür.",
    },
    imagesToPdf: {
      title: "Görsellerden PDF",
      shortTitle: "Görsel PDF",
      description: "JPG ve PNG görsellerini tek PDF belgesinde birleştir.",
    },
    textToPdf: {
      title: "Metinden PDF",
      shortTitle: "Metin PDF",
      description: "Yazılan metni veya TXT dosyasını PDF belgesine dönüştür.",
    },
    pdfToWord: {
      title: "PDF'ten Word'e",
      shortTitle: "PDF Word",
      description: "PDF dosyalarını düzenlenebilir Word belgelerine dönüştür.",
    },
    wordToPdf: {
      title: "Word'den PDF'e",
      shortTitle: "Word PDF",
      description: "Word belgelerini PDF dosyalarına dönüştür.",
    },
    askPdf: {
      title: "PDF'e Sor",
      shortTitle: "PDF'e Sor",
      description: "PDF belgesinden sorular sor ve yanıtlar al.",
    },
  },
} as const;

export type ToolTextKey = keyof typeof toolText.en;
