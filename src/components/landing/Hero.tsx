import { GENERAL_MEETING_DATE_DISPLAY } from "@/lib/site-config";
import HeroPrism from "@/components/HeroPrism";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Join", href: "#join" },
  { label: "FAQ", href: "#faq" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative w-full overflow-hidden h-[60vh] min-h-[480px] isolate bg-black"
    >
      {/* Memento Mori particle animation */}
      <div className="absolute inset-0 z-[1]" aria-hidden>
        <HeroPrism />
      </div>

      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[4]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 95%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      <div
        className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center text-center px-6"
        style={{ mixBlendMode: "difference" }}
      >
        <h1 className="uppercase text-5xl sm:text-6xl md:text-7xl font-extrabold text-white animate-fade-in">
          KTH DEVELOPER
        </h1>
        <p
          className="mt-3 font-mono text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white animate-fade-in"
          style={{ animationDelay: "120ms" }}
        >
          Stockholm · Founding {GENERAL_MEETING_DATE_DISPLAY}
        </p>
      </div>
    </section>
  );
}

export function HeroNav() {
  return (
    <nav className="border-b border-border/60">
      <div className="container max-w-5xl flex items-center justify-center gap-10 py-5">
        {navLinks.map((l) => {
          const isJoin = l.href === "#join";
          return (
            <a
              key={l.href}
              href={l.href}
              className={
                isJoin
                  ? "join-pill text-xs font-sans uppercase tracking-[0.25em] font-semibold"
                  : "text-xs font-sans uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-colors"
              }
            >
              {l.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
