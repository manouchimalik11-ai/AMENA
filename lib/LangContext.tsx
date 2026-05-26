"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "fr" | "ar";

interface LangCtx { lang: Lang; setLang: (l: Lang) => void; }
const LangContext = createContext<LangCtx>({ lang: "fr", setLang: () => {} });

export function useLang() { return useContext(LangContext); }

export default function LangWrapper({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("amena-lang") as Lang;
    if (saved === "fr" || saved === "ar") setLang(saved);
  }, []);

  function handleSet(l: Lang) {
    setLang(l);
    localStorage.setItem("amena-lang", l);
  }

  return (
    <LangContext.Provider value={{ lang, setLang: handleSet }}>
      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        style={{ fontFamily: lang === "ar" ? "'Tajawal', 'Cairo', Arial, sans-serif" : "var(--font-geist-sans), 'Segoe UI', sans-serif" }}
      >
        {children}
      </div>
    </LangContext.Provider>
  );
}
