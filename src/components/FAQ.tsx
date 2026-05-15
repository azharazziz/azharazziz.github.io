import { useState } from "react";
import { Plus } from "lucide-react";
import { useT } from "@/lib/i18n";

export function FAQ() {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            {t("faq.eyebrow")}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
            <span className="text-muted-foreground">{"// "}</span>
            {t("faq.title")}
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {(t("faq.questions") as Array<{ q: string; a: string }>).map((f, i: number) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-2xl border bg-card transition-all ${
                  isOpen ? "border-primary card-shadow" : "border-border"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-primary">
                      Q{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-base font-semibold sm:text-lg">
                      {f.q}
                    </span>
                  </span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                      isOpen ? "rotate-45 text-primary" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-dashed border-border px-6 py-5 pl-[60px] font-prose text-sm text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
