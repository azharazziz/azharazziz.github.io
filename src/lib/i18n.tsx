import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en, type Dict } from "@/locales/en";
import { id } from "@/locales/id";

export type Lang = "en" | "id";

const dicts: Record<Lang, Dict> = { en, id };

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: <T = string>(path: string) => T;
};

const Ctx = createContext<I18nCtx | null>(null);

const STORAGE_KEY = "lang";

function detectInitial(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "id") return stored;
    const nav = window.navigator.language?.toLowerCase() || "";
    if (nav.startsWith("id")) return "id";
  } catch {}
  return "en";
}

function lookup(dict: any, path: string): any {
  return path.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), dict);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Always render server + first client render with "en" to avoid hydration mismatch.
  const [lang, setLangState] = useState<Lang>("en");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLangState(detectInitial());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {}
  }, [lang, hydrated]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const t = useCallback(<T,>(path: string): T => {
    const dict = dicts[lang];
    const v = lookup(dict, path);
    if (v == null) {
      // fallback to english
      const fb = lookup(dicts.en, path);
      return (fb ?? path) as T;
    }
    return v as T;
  }, [lang]);

  const value = useMemo<I18nCtx>(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

export function useT() {
  return useI18n().t;
}
