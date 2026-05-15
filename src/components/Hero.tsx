import { ArrowRight, Github, Mail, Database, Code2, Server } from "lucide-react";
import { useT } from "@/lib/i18n";

export function Hero() {
  const t = useT();
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-blob" />
      <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl animate-blob [animation-delay:4s]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-primary">$</span> {t("hero.status")}
          </span>

          <div className="mt-6 font-mono text-sm text-muted-foreground">
            <span className="text-primary">{"~/azhar"}</span>{" "}
            <span className="text-primary-glow">$</span> {t("hero.whoami")}
          </div>

          <h1 className="mt-3 font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            {t("hero.headline_a")} <span className="gradient-text">Laravel</span> {t("hero.headline_b")}
            <br className="hidden sm:block" />
            <span className="inline-flex items-baseline gap-2">
              {t("hero.headline_c")}
              <span className="inline-block h-[0.8em] w-[0.5em] translate-y-[2px] bg-primary animate-pulse" />
            </span>
          </h1>

          <p className="mt-6 max-w-xl font-prose text-lg text-muted-foreground">
            {t("hero.intro")}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-105"
            >
              {t("hero.viewWork")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:border-primary hover:text-primary"
            >
              <Mail className="h-4 w-4" /> {t("hero.getInTouch")}
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6 text-sm text-muted-foreground">
            <div>
              <div className="font-display text-2xl font-bold text-foreground">5+</div>
              {t("hero.statYears")}
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-display text-2xl font-bold text-foreground">20+</div>
              {t("hero.statProjects")}
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-display text-2xl font-bold text-foreground">∞</div>
              {t("hero.statCoffee")}
            </div>
          </div>
        </div>

        <div className="relative hidden h-[480px] lg:block">
          <div className="absolute inset-0 rounded-3xl border border-border bg-card/50 backdrop-blur-xl card-shadow" />

          <FloatingIcon className="left-8 top-12 animate-float">
            <Code2 className="h-8 w-8 text-primary" />
            <span className="text-xs font-mono">Laravel</span>
          </FloatingIcon>
          <FloatingIcon className="right-10 top-24 [animation-delay:1.5s] animate-float">
            <Database className="h-8 w-8 text-primary-glow" />
            <span className="text-xs font-mono">MySQL</span>
          </FloatingIcon>
          <FloatingIcon className="left-16 bottom-20 [animation-delay:3s] animate-float">
            <Server className="h-8 w-8 text-primary" />
            <span className="text-xs font-mono">PHP 8.3</span>
          </FloatingIcon>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-gradient-to-br from-primary to-primary-glow p-1 glow-shadow">
            <div className="rounded-xl bg-surface px-8 py-6 text-surface-foreground">
              <div className="flex items-center gap-2 text-xs font-mono text-primary-glow">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                <span className="h-2 w-2 rounded-full bg-green-400" />
                <span className="ml-2 opacity-60">artisan</span>
              </div>
              <pre className="mt-4 text-sm font-mono leading-relaxed">
{`$ php artisan serve
> Server running on
  http://localhost:8000

> Status: ✓ shipping`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingIcon({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute flex flex-col items-center gap-1 rounded-2xl border border-border bg-card/90 px-4 py-3 card-shadow backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}
