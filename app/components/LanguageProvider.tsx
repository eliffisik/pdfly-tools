"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dictionaries, type Locale } from "@/app/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dictionary: (typeof dictionaries)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getPreferredLocale(): Locale {
  const storedLocale = window.localStorage.getItem("pdfly-locale");
  if (storedLocale === "en" || storedLocale === "tr") return storedLocale;

  return window.navigator.language.toLowerCase().startsWith("tr")
    ? "tr"
    : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setLocale(getPreferredLocale());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("pdfly-locale", locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      dictionary: dictionaries[locale],
    }),
    [locale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider.");
  }

  return context;
}
