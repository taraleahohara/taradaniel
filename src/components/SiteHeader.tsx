import { Link } from "react-router-dom";

/** Small hand-drawn nav links for the shell, in tracked lowercase. */
const navItems: { label: string; to: string }[] = [
  { label: "wedding", to: "/wedding" },
  { label: "honeymoon", to: "/honeymoon" },
  { label: "pets", to: "#" },
];

/**
 * The site shell's top bar: lowercase serif wordmark on the left,
 * tracked lowercase chapter links on the right. Neutral ink-on-ivory —
 * chapter spine colors live on the chapter pages, never here.
 */
const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-sm border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="font-display italic text-lg text-ink lowercase whitespace-nowrap shrink-0 transition-opacity duration-[var(--dur-1)] ease-[var(--ease-paper)] hover:opacity-70"
          aria-label="home"
        >
          tara &amp; daniel
        </Link>

        <nav className="flex items-center gap-3 sm:gap-5">
          {navItems.map((item, i) => (
            <span key={item.label} className="flex items-center gap-3 sm:gap-5">
              {i > 0 && (
                <span aria-hidden className="hidden sm:inline text-ink/25 select-none">·</span>
              )}
              <Link
                to={item.to}
                className="u-label text-muted-foreground hover:text-ink transition-colors duration-[var(--dur-1)] ease-[var(--ease-paper)] text-[0.62rem] sm:text-[0.7rem] tracking-[0.1em] sm:tracking-[0.22em]"
              >
                {item.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
