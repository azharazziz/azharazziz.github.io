import { Heart, Sparkles, Target } from "lucide-react";
import { useT } from "@/lib/i18n";

export function About() {
  const t = useT();
  const values = [
    { icon: Target, key: "pragmatic" as const },
    { icon: Heart, key: "user" as const },
    { icon: Sparkles, key: "modern" as const },
  ];

  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              {t("about.eyebrow")}
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
              {t("about.title_a")} <span className="gradient-text">{t("about.title_b")}</span>.
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
            </div>
          </div>

          <div className="grid gap-4">
            {values.map((v) => (
              <div
                key={v.key}
                className="group flex gap-5 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:card-shadow"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground transition-transform group-hover:scale-110">
                  <v.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    {t(`about.values.${v.key}.title`)}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(`about.values.${v.key}.body`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
