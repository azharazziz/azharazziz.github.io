import { Github, Linkedin, Mail, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border surface-dark p-10 sm:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary-glow/20 blur-3xl" />

          <div className="relative">
            <span className="font-mono text-xs uppercase tracking-widest text-primary-glow">
              04 — Contact
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Have a project in mind?
              <br />
              <span className="gradient-text">Let's build it together.</span>
            </h2>
            <p className="mt-6 max-w-xl text-white/70">
              I'm currently open to freelance work and collaborations. Drop me a line —
              I usually reply within a day.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <ContactCard
                icon={Mail}
                label="Email"
                value="hello@azharazziz.my.id"
                href="mailto:hello@azharazziz.my.id"
              />
              <ContactCard
                icon={MapPin}
                label="Based in"
                value="Magelang, Indonesia"
              />
              <ContactCard
                icon={Github}
                label="GitHub"
                value="@azharazziz"
                href="https://github.com/azharazziz"
              />
              <ContactCard
                icon={Linkedin}
                label="LinkedIn"
                value="Azhar Azziz"
                href="https://linkedin.com"
              />
            </div>

            <a
              href="mailto:hello@azharazziz.my.id"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-8 py-4 font-medium text-primary-foreground transition-transform hover:scale-105 glow-shadow"
            >
              <Mail className="h-4 w-4" /> Start a conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-primary-glow">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-white/50">{label}</div>
        <div className="mt-0.5 text-sm font-medium text-white">{value}</div>
      </div>
    </>
  );

  const className =
    "flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-all hover:border-primary-glow hover:bg-white/10";

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
