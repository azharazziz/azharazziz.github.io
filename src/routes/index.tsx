import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Blog } from "@/components/Blog";
import { Now } from "@/components/Now";
import { Music } from "@/components/Music";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { en } from "@/locales/en";

const TITLE =
  "Azhar Azziz — Full-stack Laravel Developer | Web Apps & Government Portals";
const DESCRIPTION =
  "Personal portfolio of Azhar Azziz — full-stack Laravel developer passionate about building amazing web experiences across government, healthcare, and open-source ecosystems.";
const KEYWORDS =
  "Azhar Azziz, Laravel developer, PHP developer, Laravel Indonesia, Livewire, full-stack developer, web developer Indonesia, Magelang developer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: KEYWORDS },
      { name: "author", content: "Azhar Azziz" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:creator", content: "@azharazziz" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            name: "Azhar Azziz",
            jobTitle: "Full-stack Laravel Developer",
            description: DESCRIPTION,
            url: "/",
            sameAs: [
              "https://github.com/azharazziz",
              "https://www.linkedin.com/in/azhar-azziz-afifi/",
              "https://azharazziz.my.id",
            ],
            knowsAbout: [
              "Laravel",
              "PHP",
              "Livewire",
              "Splade",
              "MySQL",
              "Tailwind CSS",
              "React",
              "TypeScript",
            ],
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: en.faq.questions.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Blog />
      <Now />
      <Music />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
