import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Azhar Azziz — Laravel PHP Developer" },
      {
        name: "description",
        content:
          "Personal portfolio of Azhar Azziz — Laravel PHP developer building elegant, modern web applications across government, healthcare, FinTech and open-source.",
      },
      { property: "og:title", content: "Azhar Azziz — Laravel PHP Developer" },
      {
        property: "og:description",
        content:
          "Portfolio showcasing Laravel, Livewire, Splade and modern web projects.",
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
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
