"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import idTranslations from "@/locales/id.json";
import enTranslations from "@/locales/en.json";

export type Language = "ID" | "EN";

export type LocaleData = typeof idTranslations;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (path: string, fallback?: string) => string;
  locale: LocaleData;
}

const locales: Record<Language, LocaleData> = {
  ID: idTranslations,
  EN: enTranslations,
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "ID",
  setLang: () => {},
  t: (_path, fallback) => fallback || _path,
  locale: idTranslations,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("ID");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("skomda_lang") as Language;
      if (savedLang === "ID" || savedLang === "EN") {
        setLangState(savedLang);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("skomda_lang", newLang);
      document.documentElement.lang = newLang.toLowerCase();
    } catch {
      // ignore
    }
  };

  // Helper for nested key lookup: e.g. t("nav.home", "Beranda")
  const t = (path: string, fallback?: string): string => {
    const keys = path.split(".");
    let current: any = locales[lang];
    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        current = undefined;
        break;
      }
    }

    if (typeof current === "string") {
      return current;
    }

    // Fallback to Indonesian if missing in English
    if (lang === "EN") {
      let idCurrent: any = locales.ID;
      for (const key of keys) {
        if (idCurrent && typeof idCurrent === "object" && key in idCurrent) {
          idCurrent = idCurrent[key];
        } else {
          idCurrent = undefined;
          break;
        }
      }
      if (typeof idCurrent === "string") {
        return idCurrent;
      }
    }

    return fallback !== undefined ? fallback : path;
  };

  const value = {
    lang,
    setLang,
    t,
    locale: locales[lang],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
