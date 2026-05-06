import { ReactNode } from "react";

interface SectionHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}

/**
 * Display heading inside a SectionFrame. Index/eyebrow are now part of
 * SectionFrame's top bar — this component handles the title + lede only.
 */
export default function SectionHeader({
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const textAlign = align === "center" ? "text-center" : "text-left";
  const items = align === "center" ? "items-center" : "items-start";
  return (
    <header className={`flex flex-col gap-5 ${items}`}>
      <h2
        className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${textAlign}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-2xl text-lg text-muted-foreground leading-relaxed ${textAlign}`}
        >
          {description}
        </p>
      )}
    </header>
  );
}
