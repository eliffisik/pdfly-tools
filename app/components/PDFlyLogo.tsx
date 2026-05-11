type PDFlyLogoProps = {
  size?: "sm" | "lg";
  showText?: boolean;
};

export default function PDFlyLogo({
  size = "sm",
  showText = true,
}: PDFlyLogoProps) {
  const isLarge = size === "lg";

  return (
    <span className="inline-flex items-center gap-3">
      <span
        className={`relative inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm ${
          isLarge ? "h-16 w-16" : "h-9 w-9"
        }`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 40 40"
          className={isLarge ? "h-11 w-11" : "h-6 w-6"}
          fill="none"
        >
          <path
            d="M12 7h11l6 6v21H12V7Z"
            fill="white"
            stroke="white"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path d="M23 7v7h7" stroke="#2563eb" strokeWidth="2" />
          <path
            d="M16 21h8M16 26h8M16 31h6"
            stroke="#2563eb"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M29 18c4 1 6 3 7 6-3-.5-5-1.6-7-3.5"
            fill="white"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M29 23c3.5 1.2 5.4 3.1 6 5.7-2.7-.4-4.6-1.4-6-2.9"
            fill="white"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M6 18h5M5 23h5M7 28h4"
            stroke="white"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      </span>

      {showText && (
        <span
          className={`font-bold tracking-tight text-zinc-950 dark:text-white ${
            isLarge ? "text-5xl sm:text-6xl" : "text-xl"
          }`}
        >
          PDF<span className="text-blue-600 dark:text-blue-400">ly</span>
        </span>
      )}
    </span>
  );
}
