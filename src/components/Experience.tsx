import { GitCommit } from "lucide-react";

const timeline = [
  {
    hash: "a3f9c21",
    date: "2024 — now",
    role: "Freelance Laravel Developer",
    org: "Self-employed · Magelang, ID",
    body: "Building Laravel SaaS products, government portals, and open-source starter kits. Shipping Lara Splade Quran, Livewire Starterkit, and client work across healthcare and FinTech.",
    tags: ["Laravel 11", "Livewire", "Splade", "Tailwind"],
  },
  {
    hash: "e1b7d04",
    date: "2022 — 2024",
    role: "Backend & Web Developer",
    org: "Government / Public Sector",
    body: "Maintained and modernized official portals (labkesmasmagelang.go.id), built integrated public services and content workflows, mentored junior devs on PHP best practices.",
    tags: ["PHP", "WordPress", "MySQL", "REST APIs"],
  },
  {
    hash: "9c4a118",
    date: "2020 — 2022",
    role: "Fullstack Web Developer",
    org: "Agency / Indie Projects",
    body: "Delivered end-to-end web apps with Laravel + Vue/Alpine, automated billing flows, and shipped a dynamic QRIS generator that's still used by small merchants today.",
    tags: ["Laravel", "Vue.js", "Alpine.js", "MySQL"],
  },
  {
    hash: "init   ",
    date: "Earlier",
    role: "Self-taught Programmer",
    org: "git init",
    body: "Started with HTML/CSS, fell in love with PHP, then found Laravel and never looked back.",
    tags: ["HTML", "CSS", "PHP"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            03 — Experience
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
            <span className="text-muted-foreground">$</span> git log{" "}
            <span className="gradient-text">--career</span>
          </h2>
          <p className="mt-4 font-prose text-muted-foreground">
            A condensed commit history of the people, products, and lessons that shaped
            how I build today.
          </p>
        </div>

        <div className="relative mt-14 pl-6 sm:pl-10">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-border to-transparent sm:left-[15px]" />

          <ol className="space-y-10">
            {timeline.map((item, i) => (
              <li key={item.hash} className="relative">
                <div className="absolute -left-6 top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-primary bg-background sm:-left-10 sm:h-8 sm:w-8">
                  <GitCommit className="hidden h-4 w-4 text-primary sm:block" />
                </div>

                <div className="font-mono text-xs text-muted-foreground">
                  <span className="text-primary">commit</span>{" "}
                  <span className="text-foreground">{item.hash}</span>
                  <span className="mx-2 opacity-50">·</span>
                  <span>{item.date}</span>
                </div>

                <div className="mt-2 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:card-shadow">
                  <h3 className="font-display text-xl font-semibold">{item.role}</h3>
                  <div className="mt-1 font-mono text-xs text-primary">{item.org}</div>
                  <p className="mt-3 font-prose text-sm text-muted-foreground">
                    {item.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] text-secondary-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
