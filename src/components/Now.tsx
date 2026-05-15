import { BookOpen, Code2, Headphones, Coffee } from "lucide-react";
import { useT } from "@/lib/i18n";

const processes = [
  {
    pid: "1024",
    icon: Code2,
    name: "building",
    detail: "A Laravel 11 + Livewire 3 SaaS starter with team billing",
    cpu: "82%",
    color: "text-primary",
  },
  {
    pid: "2048",
    icon: BookOpen,
    name: "reading",
    detail: "“A Philosophy of Software Design” — John Ousterhout",
    cpu: "14%",
    color: "text-primary-glow",
  },
  {
    pid: "3072",
    icon: Headphones,
    name: "listening",
    detail: "Syntax.fm · Laravel News Podcast · lofi beats",
    cpu: "08%",
    color: "text-amber-400",
  },
  {
    pid: "4096",
    icon: Coffee,
    name: "fueling",
    detail: "Black coffee, no sugar. Always.",
    cpu: "99%",
    color: "text-orange-400",
  },
];

export function Now() {
  const t = useT();
  const localizedProcesses = t("now.processes").map((p, i) => ({
    ...p,
    icon: processes[i].icon,
    color: processes[i].color,
  }));
  return (
    <section id="now" className="relative surface-dark py-32">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-primary-glow">
            {t("now.eyebrow")}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            <span className="text-white/40">$</span> top -u{" "}
            <span className="gradient-text">azhar</span>
          </h2>
          <p className="mt-4 font-prose text-white/70">
            {t("now.description")}
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur">
          {/* terminal title bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
            </div>
            <span className="font-mono text-[11px] text-white/40">
              {t("now.terminalUser")}
            </span>
            <span className="font-mono text-[11px] text-white/40">{t("now.terminalShell")}</span>
          </div>

          {/* table header */}
          <div className="hidden grid-cols-[60px_140px_1fr_70px] gap-4 border-b border-white/10 bg-white/5 px-6 py-2 font-mono text-[11px] uppercase tracking-wider text-white/40 sm:grid">
            <span>{t("now.tableHeaders.pid")}</span>
            <span>{t("now.tableHeaders.process")}</span>
            <span>{t("now.tableHeaders.detail")}</span>
            <span className="text-right">{t("now.tableHeaders.cpu")}</span>
          </div>

          <div className="divide-y divide-white/5">
            {localizedProcesses.map((p) => (
              <div
                key={p.pid}
                className="grid grid-cols-[1fr_70px] gap-4 px-6 py-4 font-mono text-sm transition-colors hover:bg-white/5 sm:grid-cols-[60px_140px_1fr_70px]"
              >
                <span className="hidden text-white/40 sm:block">{p.pid}</span>
                <span className={`flex items-center gap-2 ${p.color}`}>
                  <p.icon className="h-4 w-4" />
                  {p.name}
                </span>
                <span className="font-prose text-sm text-white/80">{p.detail}</span>
                <span className="text-right text-white/60">{p.cpu}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 bg-white/5 px-6 py-3 font-mono text-xs text-white/40">
            <span className="text-primary-glow">▸</span> last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            <span className="ml-1 inline-block h-3 w-2 translate-y-[2px] bg-primary-glow animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
