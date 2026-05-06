import { ReactNode } from "react";

interface SectionRowProps {
  index: string;
  label: string;
  meta?: string;
  children: ReactNode;
  id?: string;
  className?: string;
}

/**
 * A single row inside the page-wide concatenated frame. No own border —
 * the parent frame draws the outer border, and adjacent rows share a
 * single 1px divider via `border-t`.
 */
export default function SectionRow({
  index,
  label,
  meta,
  children,
  id,
  className = "",
}: SectionRowProps) {
  return (
    <section id={id} className={`relative scroll-mt-24 ${className}`}>
      <div className="flex items-center gap-4 border-b border-border px-5 sm:px-8 py-3 bg-background">
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/70">
          {index}
        </span>
        <span className="bracket-label">{label}</span>
        <span className="ascii-rule flex-1 text-[10px] hidden sm:block">
          {"─".repeat(200)}
        </span>
        {meta && (
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/70">
            {meta}
          </span>
        )}
      </div>
      <div className="px-5 sm:px-10 py-16 sm:py-24">{children}</div>
    </section>
  );
}
