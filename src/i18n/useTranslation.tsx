import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language, Translations, languageNames } from "./index";

interface LanguageContextType {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
  languageNames: Record<Language, string>;
  availableLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("lang");
    if (saved && (saved === "zh" || saved === "en" || saved === "ja" || saved === "ko" || saved === "fr" || saved === "de" || saved === "es")) {
      return saved as Language;
    }
    // 默认根据浏览器语言设置
    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "zh" || browserLang === "en" || browserLang === "ja" || browserLang === "ko" || browserLang === "fr" || browserLang === "de" || browserLang === "es") {
      return browserLang as Language;
    }
    return "zh";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const availableLanguages: Language[] = ["zh", "en", "ja", "ko", "fr", "de", "es"];

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, languageNames, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}