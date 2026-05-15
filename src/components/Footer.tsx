import { useT } from "@/lib/i18n";

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Azhar Azziz. {t("footer.rights")}</p>
        <p className="font-mono text-xs">
          {t("footer.builtWith")} <span className="text-primary">React</span> ·{" "}
          <span className="text-primary">Tailwind</span>
        </p>
      </div>
    </footer>
  );
}
