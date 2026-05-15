import { useState } from "react";
import { ExternalLink, Github, Star } from "lucide-react";
import { useT } from "@/lib/i18n";

type Project = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  live?: string;
  repo?: string;
  featured?: boolean;
  status?: "Featured" | "Live" | "Open Source" | "Government" | "Private" | "Healthcare" | "Payment" | "Creative" | "IoT/Network" | "Charity";
};

const projects: Project[] = [
  {
    title: "Lara Splade Quran",
    description:
      "Aplikasi Al-Qur'an digital modern dengan interface elegant, fitur pencarian ayat, bookmark, dan terjemahan Bahasa Indonesia untuk pengalaman membaca yang optimal.",
    category: "Laravel",
    tags: ["Laravel Splade", "Vue.js", "MySQL", "Tailwind CSS"],
    live: "https://quran.azharazziz.my.id",
    repo: "https://github.com/azharazziz/lara-splade-quran",
    featured: true,
    status: "Featured",
  },
  {
    title: "Website Balai Labkesmas Magelang",
    description:
      "Website resmi pemerintah dengan sistem informasi terpadu (Si Dul), layanan online, dan sistem surveilans kesehatan berbasis laboratorium yang mematuhi standar ISO 17025.",
    category: "Government",
    tags: ["WordPress", "PHP", "MySQL", "Custom Theme"],
    live: "https://labkesmasmagelang.go.id",
    status: "Government",
  },
  {
    title: "Laravel Livewire Starterkit",
    description:
      "Template starter Laravel modern dengan sistem autentikasi fleksibel (username/email), antarmuka responsif, dan integrasi Livewire untuk pengembangan yang efisien dan cepat.",
    category: "Open Source",
    tags: ["Laravel 11", "Livewire 3", "MySQL", "Bootstrap"],
    repo: "https://github.com/azharazziz/Laravel-Livewire-Starterkit-With-Username-or-Email-login",
    status: "Open Source",
  },
  {
    title: "Biorepository System",
    description:
      "Sistem manajemen biorepository komprehensif untuk tracking sampel biologis, metadata management, dan standar internasional biobanking.",
    category: "Healthcare",
    tags: ["Laravel 11", "Livewire 3", "Tailwind CSS", "Biobanking"],
    status: "Private",
  },
  {
    title: "Portal Labkesmas Magelang",
    description:
      "Portal terintegrasi untuk layanan Balai Labkesmas Magelang dengan fitur registrasi konsultasi klinik, pemeriksaan laboratorium, pelacakan hasil, dan pendaftaran program wisata ilmiah.",
    category: "Government",
    tags: ["Laravel 11", "Livewire 3", "FluxUI", "MySQL"],
    live: "https://portal.labkesmasmagelang.go.id",
    repo: "https://docs.portal.labkesmasmagelang.go.id/",
    status: "Live",
  },
  {
    title: "Dynamic QRIS Generator",
    description:
      "Solusi inovatif mengkonversi QRIS statis menjadi dinamis menggunakan Google Apps Script untuk transaksi digital yang fleksibel.",
    category: "FinTech",
    tags: ["Google Apps Script", "JavaScript", "QR Code API", "MIT License"],
    repo: "https://github.com/azharazziz/dynamic-qris-google-app-script",
    status: "Featured",
  },
  {
    title: "WhatsApp Bulk Sender",
    description:
      "Aplikasi modern untuk mengirim pesan WhatsApp secara massal menggunakan ZAPIN API. Fitur upload CSV/VCF, template variables, anti-spam protection, dan privacy-first design dengan client-side storage.",
    category: "Open Source",
    tags: ["Node.js", "Express.js", "JavaScript", "ZAPIN API"],
    live: "https://whatsapp-automate-sender.vercel.app/",
    repo: "https://github.com/azharazziz/whatsapp-bulk-sender",
    status: "Live",
  },
  {
    title: "NIKAHFIX - Netflix Style Wedding",
    description:
      "Website undangan pernikahan modern dengan interface Netflix-style, fitur audio control, gallery carousel, sistem ucapan real-time, dan integrasi Google Maps untuk pengalaman yang memorable.",
    category: "React",
    tags: ["React 18", "Vite", "TailwindCSS", "Supabase"],
    live: "https://nikahfix-v02.vercel.app/",
    repo: "https://github.com/azharazziz/nikahfix",
    featured: true,
    status: "Featured",
  },
  {
    title: "Brave Pink Hero Green",
    description:
      "Tool kreatif untuk transformasi foto dengan efek duotone dan pola halftone bergaya komik. Semua pemrosesan dilakukan secara lokal di browser untuk privasi maksimal, dengan opsi ramah buta warna.",
    category: "React",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Canvas API"],
    live: "https://brave-pink-hero-green-v2.lovable.app/",
    repo: "https://github.com/azharazziz/brave-pink-hero-green-412",
    status: "Creative",
  },
  {
    title: "CoverVault Gallery",
    description:
      "Digital preservation gallery of 100+ professional-grade book cover mockups. Browse, preview, dan download PSD files instantly dengan smart search, dark/light mode, responsive design, dan integrasi sosial media untuk berbagi desain favorit.",
    category: "React",
    tags: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui"],
    live: "https://covervault-gallery.vercel.app/",
    repo: "https://github.com/azharazziz/covervault-gallery",
    status: "Live",
  },
  {
    title: "Donasi Alquran",
    description:
      "Platform transparansi publik untuk program donasi Al-Qur'an dengan dashboard dinamis yang terhubung ke Google Sheets. Fitur detection otomatis kolom, visualisasi data real-time, gallery dengan lightbox, dan desain islami yang elegan.",
    category: "React",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Recharts", "Google Sheets"],
    live: "https://donasi-alquran.vercel.app/",
    repo: "https://github.com/azharazziz/donasi-alquran-linktree",
    status: "Charity",
  },
  {
    title: "Wedding Photobook",
    description:
      "Aplikasi web untuk membuat photobook digital untuk pratinjau foto pernikahan dengan tema elegan, dilengkapi dengan fitur like. Dibuat dengan membaca direktori gambar secara dinamis menggunakan Express.js.",
    category: "Node.js",
    tags: ["Express", "Node.js"],
    live: "https://wedding-gallery.azharazziz.my.id/",
    repo: "https://github.com/azharazziz/photobook-express",
    status: "Creative",
  },
  {
    title: "UniFi Docker on Armbian STB",
    description:
      "Panduan lengkap menjalankan UniFi Network Application menggunakan Docker di Armbian pada STB HG680P (Amlogic S905X). Mengubah set-top box menjadi controller jaringan yang hemat biaya dengan fitur network management profesional.",
    category: "Open Source",
    tags: ["Docker", "Armbian", "Linux", "UniFi"],
    repo: "https://github.com/azharazziz/unifi-docker-on-armbian-stb-HG680P",
    status: "IoT/Network",
  },
  {
    title: "SI Elang Studio",
    description:
      "Studio interaktif untuk membuat dan desain mascot \"Elang\" Balai Labkesmas Magelang. Platform kreatif dengan tools editing yang intuitif, asset management, dan preview real-time untuk menciptakan karakter yang unik dan profesional.",
    category: "Government",
    tags: ["Laravel", "Livewire", "Tailwind CSS", "MySQL"],
    live: "https://sielang.labkesmasmagelang.go.id",
    repo: "https://github.com/azharazziz/si-elang-studio",
    status: "Live",
  },
  {
    title: "Git Logbook Dashboard",
    description:
      "Dashboard interaktif untuk visualisasi dan analisis git commit history dengan insights mendalam. Menampilkan contributor statistics, activity trends, commit patterns, dan productivity metrics dalam interface yang intuitif dan responsif.",
    category: "React",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Git API"],
    live: "https://git-logbook-dashboard.vercel.app/",
    repo: "https://github.com/azharazziz/git-logbook-dashboard",
    featured: true,
    status: "Featured",
  },
];

const categories = ["All", "Laravel", "React", "Government", "Open Source", "FinTech", "Node.js", "Healthcare"];

export function Projects() {
  const t = useT();
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              {t("projects.eyebrow")}
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
              {t("projects.title")}
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
                {c === "All" ? t("projects.all") : c}
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
                  <Star className="h-3 w-3" /> {t("projects.featured")}
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
                    <ExternalLink className="h-4 w-4" /> {t("projects.live")}
                  </a>
                )}
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Github className="h-4 w-4" /> {t("projects.source")}
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
