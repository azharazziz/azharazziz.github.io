export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Azhar Azziz. Crafted with Laravel love.</p>
        <p className="font-mono text-xs">
          Built with <span className="text-primary">React</span> · <span className="text-primary">Tailwind</span>
        </p>
      </div>
    </footer>
  );
}
