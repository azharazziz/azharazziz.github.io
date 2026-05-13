import { Heart, Sparkles, Target } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Pragmatic craft",
    body: "I pick the right tool for the job — Laravel and friends — without over-engineering.",
  },
  {
    icon: Heart,
    title: "User-first thinking",
    body: "Code is a means; the experience is the product. I care about both deeply.",
  },
  {
    icon: Sparkles,
    title: "Modern stack",
    body: "Livewire, Splade, Alpine, Tailwind, Vite — keeping the dev loop tight and joyful.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              01 — About
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
              A developer who treats code like <span className="gradient-text">craft</span>.
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                For the past few years I've been deep in the Laravel ecosystem, building
                everything from official government portals to SaaS dashboards and digital
                Qur'an apps. I love the elegance of expressive code and the discipline of
                shipping reliable software.
              </p>
              <p>
                Beyond Laravel, I work comfortably across the modern web — React, Node,
                Tailwind, Supabase — wherever the project takes me. My north star: build
                things that are useful, fast, and a little bit delightful.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="group flex gap-5 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:card-shadow"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground transition-transform group-hover:scale-110">
                  <v.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
