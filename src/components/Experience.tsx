import { GitCommit } from "lucide-react";

const timeline = [
  {
    hash: "f2a8c45",
    date: "2023 — now",
    role: "Junior Computer Specialist",
    org: "Balai Laboratorium Kesehatan Masyarakat Magelang · Magelang Tengah, Jawa Tengah",
    body: "Developed and maintained critical applications for public health laboratory management. Building web applications with Laravel and Tailwind CSS, managing digital infrastructure, and supporting digital transformation initiatives in healthcare sector.",
    tags: ["Laravel", "Tailwind CSS", "MySQL", "Web Development"],
  },
  {
    hash: "d5e7b32",
    date: "2022 — 2023",
    role: "Junior Computer Specialist",
    org: "Agency for Health Policies Development · Magelang, Indonesia",
    body: "Built web applications and digital solutions for health policy initiatives. Worked on backend development, database design, and system integration for various government health programs.",
    tags: ["Laravel", "MySQL", "PHP", "Database Design"],
  },
  {
    hash: "c3f6a19",
    date: "2022 — 2022",
    role: "Information Systems Analyst",
    org: "Government Institution · Magelang Tengah, Jawa Tengah, Indonesia",
    body: "Analyzed and documented system requirements, designed information system solutions, and provided technical support for government operations. Focused on process optimization and system integration.",
    tags: ["Laravel", "System Analysis", "PHP", "Database"],
  },
  {
    hash: "b1d4e28",
    date: "2020 — 2021",
    role: "Information Systems Analyst",
    org: "National Institute of Health Research and Development (NIHRD), Indonesia · Magelang Tengah, Jawa Tengah",
    body: "Analyzed business requirements and designed technical solutions for health research systems. Developed applications and provided recommendations for system improvements in research infrastructure.",
    tags: ["Laravel", "Software Development", "PHP", "Information Systems"],
  },
  {
    hash: "a9c3f17",
    date: "2019 — 2020",
    role: "IT Support Specialist",
    org: "PT. BPR KEMBANG PARAMA · Magelang, Indonesia",
    body: "Managed and maintained company IT infrastructure, supported banking software operations, and coordinated with branch offices. Responsibilities included user access management for core banking systems, software deployment, and equipment maintenance.",
    tags: ["IT Support", "Software Deployment", "Banking Systems", "Infrastructure"],
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
