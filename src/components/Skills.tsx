import { useT } from "@/lib/i18n";

const groups = [
  {
    title: "Laravel Ecosystem",
    items: ["Laravel 11", "Livewire 3", "Splade", "Eloquent ORM", "Queues & Jobs", "Sanctum"],
  },
  {
    title: "Database & Backend",
    items: ["MySQL", "SQLite", "PostgreSQL", "REST APIs", "Query Optimization", "Caching"],
  },
  {
    title: "Frontend",
    items: ["Tailwind CSS", "Alpine.js", "Vue.js", "React", "Vite", "TypeScript"],
  },
  {
    title: "Tools & Workflow",
    items: ["Git & GitHub", "Composer", "NPM/Bun", "Docker", "CI/CD", "VS Code"],
  },
];

export function Skills() {
  const t = useT();
  return (
    <section id="skills" className="relative surface-dark py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-32 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-primary-glow">
            {t("skills.eyebrow")}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
            {t("skills.title")}
          </h2>
          <p className="mt-4 text-white/70">
            {t("skills.description")}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(t("skills.groups") as Array<{ title: string; items: string[] }>).map((g, i: number) => (
            <div
              key={g.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary-glow hover:bg-white/10"
            >
              <div className="absolute -right-6 -top-6 font-display text-7xl font-bold text-white/5">
                0{i + 1}
              </div>
              <h3 className="relative font-display text-lg font-semibold text-white">
                {g.title}
              </h3>
              <ul className="relative mt-4 space-y-2">
                {g.items.map((item: string) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-white/75"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
