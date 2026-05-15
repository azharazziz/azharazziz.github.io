import { useI18n, type Lang } from "@/lib/i18n";
import { Languages } from "lucide-react";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();

  const make = (l: Lang) =>
    `relative px-2 py-0.5 text-xs font-mono uppercase tracking-wider transition-colors ${
      lang === l ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-border bg-card/60 px-2 py-1 backdrop-blur ${className}`}
      role="group"
      aria-label="Language"
    >
      <Languages className="h-3.5 w-3.5 text-muted-foreground" />
      <button type="button" onClick={() => setLang("en")} className={make("en")} aria-pressed={lang === "en"}>
        EN
      </button>
      <span className="text-muted-foreground/40">/</span>
      <button type="button" onClick={() => setLang("id")} className={make("id")} aria-pressed={lang === "id"}>
        ID
      </button>
    </div>
  );
}
