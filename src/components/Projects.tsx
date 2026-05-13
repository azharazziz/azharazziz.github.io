import { useState } from "react";
import { ExternalLink, Github, Star } from "lucide-react";

type Project = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  live?: string;
  repo?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "Lara Splade Quran",
    description:
      "Modern Al-Qur'an digital application with elegant reading experience.",
    category: "Laravel",
    tags: ["Laravel Splade", "Vue.js", "MySQL", "Tailwind"],
    live: "https://quran.azharazziz.my.id",
    featured: true,
  },
  {
    title: "Balai Labkesmas Magelang",
    description:
      "Official government website with integrated public services portal.",
    category: "Government",
    tags: ["WordPress", "PHP", "MySQL", "Custom Theme"],
    live: "https://labkesmasmagelang.go.id",
  },
  {
    title: "Laravel Livewire Starterkit",
    description:
      "Modern Laravel starter template with flexible authentication and tooling.",
    category: "Open Source",
    tags: ["Laravel 11", "Livewire 3", "MySQL", "Bootstrap"],
    repo: "https://github.com/azharazziz",
  },
  {
    title: "NIKAHFIX — Netflix Style Wedding",
    description:
      "Wedding invitation website with a Netflix-inspired browse experience.",
    category: "React",
    tags: ["React 18", "Vite", "Tailwind", "Supabase"],
    live: "https://azhar-fathin.vercel.app",
  },
  {
    title: "Dynamic QRIS Generator",
    description:
      "Convert static QRIS codes into dynamic ones — fast and free.",
    category: "FinTech",
    tags: ["Apps Script", "JavaScript", "QR API"],
    repo: "https://github.com/azharazziz",
  },
  {
    title: "WhatsApp Bulk Sender",
    description:
      "Modern bulk WhatsApp messaging app powered by the ZAPIN API.",
    category: "Open Source",
    tags: ["Node.js", "Express", "ZAPIN API"],
    live: "https://whatsapp-automate-sender.vercel.app",
    repo: "https://github.com/azharazziz",
  },
];

const categories = ["All", "Laravel", "React", "Government", "FinTech", "Open Source"];

export function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              03 — Selected Work
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
              Projects I've shipped recently.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  filter === c
                    ? "bg-foreground text-background"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.title}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:card-shadow ${
                p.featured ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              {p.featured && (
                <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-primary-glow px-3 py-1 text-xs font-medium text-primary-foreground">
                  <Star className="h-3 w-3" /> Featured
                </span>
              )}

              <div className="mb-4 inline-flex w-fit rounded-full border border-border bg-muted px-3 py-1 text-xs font-mono text-muted-foreground">
                {p.category}
              </div>

              <h3 className="font-display text-2xl font-bold transition-colors group-hover:text-primary">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" /> Live demo
                  </a>
                )}
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Github className="h-4 w-4" /> Source
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
