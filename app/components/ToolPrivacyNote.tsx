"use client";

import { useLanguage } from "./LanguageProvider";

type ToolPrivacyNoteProps = {
  ai?: boolean;
};

export default function ToolPrivacyNote({ ai = false }: ToolPrivacyNoteProps) {
  const { dictionary } = useLanguage();

  return (
    <p className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-800 dark:border-blue-950 dark:bg-blue-950/30 dark:text-blue-200">
      {ai ? dictionary.common.aiPrivacyNote : dictionary.common.privacyNote}
    </p>
  );
}
