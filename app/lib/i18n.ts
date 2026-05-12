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
    common: {
      somethingWentWrong: "Something went wrong.",
      success: "Done",
      error: "Action failed",
      fileReady: "Your file is ready to download.",
      filesReady: "Your files are ready to download.",
      removeFile: "Remove file",
      processingFile: "Processing your file...",
      processingFiles: "Processing your files...",
      downloadPdf: "Download PDF",
      privacyNote:
        "Privacy note: files are processed temporarily for this action and are not stored by PDFly.",
      aiPrivacyNote:
        "Privacy note: this tool extracts text from your PDF and sends that text to OpenAI for summarization. Uploaded files are not stored by PDFly.",
      dropPdf: "Drop a PDF here",
      chooseOnePdf: "or click to choose one PDF file",
      chooseTextPdf: "or click to choose one text-based PDF",
      dropPdfs: "Drop PDFs here",
      addMorePdfs: "Add more PDFs",
      chooseMultiplePdfs: "drop more files or click to choose multiple PDFs",
      dropImages: "Drop images here",
      addMoreImages: "Add more images",
      chooseImages: "or click to choose JPG or PNG images",
      dropTxt: "Drop a TXT file here",
      chooseTxt: "or click to choose one .txt file",
      selectedFiles: "Selected files",
      selectedImages: "Selected images",
      pageRanges: "Page ranges",
      pageRangesPlaceholder: "1-3,5,8-10",
      pageRangesHelp: "Use commas for separate pages and hyphens for ranges.",
      optionalPageRangesHelp: "Optional. Use formats like 1-3,5,8-10.",
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
    privacyPage: {
      eyebrow: "Trust & safety",
      title: "Privacy and security",
      description:
        "PDFly is designed as a focused PDF tools workspace. This page explains what happens to files during processing and where AI features differ from regular PDF tools.",
      sections: [
        {
          title: "File Processing",
          body: "PDFly processes uploaded files only for the action you request. Non-AI tools such as merge, split, rotate, delete pages, reorder pages, and image conversion do not store uploaded files in the application.",
        },
        {
          title: "AI Summary",
          body: "AI Summary extracts readable text from your PDF and sends that extracted text to OpenAI to generate a summary. Do not use AI Summary for files that contain sensitive, confidential, or regulated information unless you are comfortable with that processing.",
        },
        {
          title: "Temporary Data",
          body: "Generated download files are returned directly to your browser. The current app does not provide accounts, file history, or long-term file storage.",
        },
        {
          title: "Local Development",
          body: "When running locally, your environment variables such as OPENAI_API_KEY stay on your machine and should not be committed to GitHub.",
        },
      ],
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
    toolUi: {
      merge: {
        loading: "Merging PDFs...",
        progress: "Processing your files...",
        download: "Download merged PDF",
      },
      split: {
        loading: "Splitting PDF...",
        progress: "Creating your new PDF...",
        download: "Download split PDF",
      },
      compress: {
        loading: "Compressing...",
        progress: "Processing your file...",
        original: "Original",
        output: "Output",
        change: "Change",
        smaller: "smaller",
        larger: "larger",
        download: "Download compressed PDF",
      },
      rotate: {
        rotation: "Rotation",
        degree: "deg",
        allPagesPlaceholder: "Leave empty for all pages",
        loading: "Rotating PDF...",
        progress: "Applying rotation...",
        download: "Download rotated PDF",
      },
      deletePages: {
        pagesToDelete: "Pages to delete",
        loading: "Deleting pages...",
        progress: "Creating cleaned PDF...",
        download: "Download cleaned PDF",
      },
      reorderPages: {
        newPageOrder: "New page order",
        placeholder: "3,1,2,4",
        help: "List every page once in the order you want.",
        loading: "Reordering pages...",
        progress: "Building reordered PDF...",
        download: "Download reordered PDF",
      },
      pageNumbers: {
        startNumber: "Start number",
        loading: "Adding page numbers...",
        progress: "Stamping page numbers...",
        download: "Download numbered PDF",
      },
      aiSummary: {
        loading: "Summarizing...",
        progress: "Reading the PDF and preparing the summary...",
        button: "Summarize PDF",
        resultTitle: "Summary",
      },
      extractText: {
        loading: "Extracting text...",
        progress: "Reading text from your PDF...",
        resultTitle: "Extracted text",
        download: "Download TXT",
      },
      pdfToImages: {
        quality: "Image quality",
        standard: "Standard",
        high: "High",
        ultra: "Ultra",
        loading: "Converting pages...",
        progress: "Rendering PDF pages into PNG images...",
        button: "Convert to PNG",
        resultTitle: "Converted images",
        downloadImage: "Download image",
        imageCreateError: "Could not create an image from this page.",
        canvasUnsupported: "Canvas is not supported in this browser.",
      },
      imagesToPdf: {
        loading: "Creating PDF...",
        progress: "Combining images into one PDF...",
        button: "Create PDF",
        download: "Download PDF",
      },
      textToPdf: {
        text: "Text",
        placeholder: "Type or paste text here...",
        divider: "or upload txt",
        loading: "Creating PDF...",
        progress: "Converting text into a PDF...",
        button: "Create PDF",
        download: "Download PDF",
      },
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
    common: {
      somethingWentWrong: "Bir şeyler ters gitti.",
      success: "Tamamlandı",
      error: "İşlem başarısız",
      fileReady: "Dosyan indirmeye hazır.",
      filesReady: "Dosyaların indirmeye hazır.",
      removeFile: "Dosyayı kaldır",
      processingFile: "Dosyan işleniyor...",
      processingFiles: "Dosyaların işleniyor...",
      downloadPdf: "PDF indir",
      privacyNote:
        "Gizlilik notu: dosyalar bu işlem için geçici olarak işlenir ve PDFly tarafından saklanmaz.",
      aiPrivacyNote:
        "Gizlilik notu: bu araç PDF'teki metni çıkarır ve özetleme için bu metni OpenAI'a gönderir. Yüklenen dosyalar PDFly tarafından saklanmaz.",
      dropPdf: "PDF'i buraya bırak",
      chooseOnePdf: "veya tek bir PDF dosyası seçmek için tıkla",
      chooseTextPdf: "veya metin tabanlı bir PDF seçmek için tıkla",
      dropPdfs: "PDF'leri buraya bırak",
      addMorePdfs: "Daha fazla PDF ekle",
      chooseMultiplePdfs: "daha fazla dosya bırak veya birden fazla PDF seçmek için tıkla",
      dropImages: "Görselleri buraya bırak",
      addMoreImages: "Daha fazla görsel ekle",
      chooseImages: "veya JPG/PNG görselleri seçmek için tıkla",
      dropTxt: "TXT dosyasını buraya bırak",
      chooseTxt: "veya bir .txt dosyası seçmek için tıkla",
      selectedFiles: "Seçilen dosyalar",
      selectedImages: "Seçilen görseller",
      pageRanges: "Sayfa aralıkları",
      pageRangesPlaceholder: "1-3,5,8-10",
      pageRangesHelp: "Ayrı sayfalar için virgül, aralıklar için kısa çizgi kullan.",
      optionalPageRangesHelp: "İsteğe bağlı. 1-3,5,8-10 gibi formatlar kullan.",
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
    privacyPage: {
      eyebrow: "Güven ve güvenlik",
      title: "Gizlilik ve güvenlik",
      description:
        "PDFly odaklı bir PDF araçları çalışma alanı olarak tasarlandı. Bu sayfa, işlem sırasında dosyalara ne olduğunu ve AI özelliklerinin normal PDF araçlarından nerede ayrıldığını açıklar.",
      sections: [
        {
          title: "Dosya İşleme",
          body: "PDFly, yüklenen dosyaları yalnızca istediğin işlem için işler. Birleştirme, bölme, döndürme, sayfa silme, sayfa sıralama ve görsel dönüştürme gibi AI içermeyen araçlar yüklenen dosyaları uygulamada saklamaz.",
        },
        {
          title: "AI Özet",
          body: "AI Özet, PDF'teki okunabilir metni çıkarır ve özet oluşturmak için bu metni OpenAI'a gönderir. Hassas, gizli veya regülasyona tabi bilgiler içeren dosyaları bu işleme uygun bulmuyorsan AI Özet ile kullanma.",
        },
        {
          title: "Geçici Veri",
          body: "Oluşturulan indirme dosyaları doğrudan tarayıcına döner. Mevcut uygulamada hesap, dosya geçmişi veya uzun süreli dosya saklama yoktur.",
        },
        {
          title: "Yerel Geliştirme",
          body: "Yerelde çalışırken OPENAI_API_KEY gibi ortam değişkenleri bilgisayarında kalır ve GitHub'a commitlenmemelidir.",
        },
      ],
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
    toolUi: {
      merge: {
        loading: "PDF'ler birleştiriliyor...",
        progress: "Dosyaların işleniyor...",
        download: "Birleştirilmiş PDF'i indir",
      },
      split: {
        loading: "PDF bölünüyor...",
        progress: "Yeni PDF'in oluşturuluyor...",
        download: "Bölünmüş PDF'i indir",
      },
      compress: {
        loading: "Sıkıştırılıyor...",
        progress: "Dosyan işleniyor...",
        original: "Orijinal",
        output: "Çıktı",
        change: "Değişim",
        smaller: "daha küçük",
        larger: "daha büyük",
        download: "Sıkıştırılmış PDF'i indir",
      },
      rotate: {
        rotation: "Döndürme",
        degree: "derece",
        allPagesPlaceholder: "Tüm sayfalar için boş bırak",
        loading: "PDF döndürülüyor...",
        progress: "Döndürme uygulanıyor...",
        download: "Döndürülmüş PDF'i indir",
      },
      deletePages: {
        pagesToDelete: "Silinecek sayfalar",
        loading: "Sayfalar siliniyor...",
        progress: "Temizlenmiş PDF oluşturuluyor...",
        download: "Temizlenmiş PDF'i indir",
      },
      reorderPages: {
        newPageOrder: "Yeni sayfa sırası",
        placeholder: "3,1,2,4",
        help: "Her sayfayı istediğin sırada bir kez listele.",
        loading: "Sayfalar sıralanıyor...",
        progress: "Sıralanmış PDF oluşturuluyor...",
        download: "Sıralanmış PDF'i indir",
      },
      pageNumbers: {
        startNumber: "Başlangıç numarası",
        loading: "Sayfa numaraları ekleniyor...",
        progress: "Sayfa numaraları işleniyor...",
        download: "Numaralı PDF'i indir",
      },
      aiSummary: {
        loading: "Özetleniyor...",
        progress: "PDF okunuyor ve özet hazırlanıyor...",
        button: "PDF'i özetle",
        resultTitle: "Özet",
      },
      extractText: {
        loading: "Metin çıkarılıyor...",
        progress: "PDF'teki metin okunuyor...",
        resultTitle: "Çıkarılan metin",
        download: "TXT indir",
      },
      pdfToImages: {
        quality: "Görsel kalitesi",
        standard: "Standart",
        high: "Yüksek",
        ultra: "Ultra",
        loading: "Sayfalar dönüştürülüyor...",
        progress: "PDF sayfaları PNG görsellere dönüştürülüyor...",
        button: "PNG'ye dönüştür",
        resultTitle: "Dönüştürülen görseller",
        downloadImage: "Görseli indir",
        imageCreateError: "Bu sayfadan görsel oluşturulamadı.",
        canvasUnsupported: "Bu tarayıcı canvas desteği sunmuyor.",
      },
      imagesToPdf: {
        loading: "PDF oluşturuluyor...",
        progress: "Görseller tek PDF'te birleştiriliyor...",
        button: "PDF oluştur",
        download: "PDF indir",
      },
      textToPdf: {
        text: "Metin",
        placeholder: "Metni buraya yaz veya yapıştır...",
        divider: "veya txt yükle",
        loading: "PDF oluşturuluyor...",
        progress: "Metin PDF'e dönüştürülüyor...",
        button: "PDF oluştur",
        download: "PDF indir",
      },
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
