import { Code2, ServerCog, Cpu, Box } from "lucide-react";
import { GENERAL_MEETING_DATE_DISPLAY } from "@/lib/site-config";
import SectionRow from "./SectionFrame";

const tiles = [
  {
    icon: Code2,
    label: "Make",
    title: "Production-grade software.",
    body: "Frontends, backends, infrastructure — built end-to-end to a standard you'd be proud to ship under your own name.",
  },
  {
    icon: ServerCog,
    label: "Own",
    title: "Self-hosted stack.",
    body: "Run own servers and tools. Open-source services, no vendor lock-in.",
  },
  {
    icon: Cpu,
    label: "Operate",
    title: "Real systems, real uptime.",
    body: "Treat what we build as live software. Monitor, deploy, iterate.",
  },
  {
    icon: Box,
    label: "Ship",
    title: "Used by real people.",
    body: "Members, partners, and the wider KTH community get hands on what we make.",
  },
];

export default function About() {
  return (
    <SectionRow id="about" index="01" label="About" meta="MAKE">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Make{" "}
          <span className="text-gradient-red">world-class applications</span>
        </h2>
      </div>

      <div className="mt-16 -mx-5 sm:-mx-10 -mb-16 sm:-mb-24 grid lg:grid-cols-3 lg:grid-rows-2 border-t border-white/15 [&>*]:border-white/15">
        {/* Mission cell, spans 2 rows on the left */}
        <div className="relative p-8 sm:p-10 pb-16 lg:col-start-1 lg:row-start-1 lg:row-span-2 flex flex-col border-b border-border lg:border-b-0 lg:border-r lg:border-border">
          <span className="bracket-label">Mission</span>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed">
            KTH Developer is an upcoming student association at KTH Royal
            Institute of Technology in Stockholm — to be formally established on{" "}
            <strong className="text-foreground">
              {GENERAL_MEETING_DATE_DISPLAY}
            </strong>
            . We exist to build digital sovereignty through software,
            infrastructure and self-hosted services that students own, operate
            and ship together.
          </p>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed">
            Our founding projects: building a{" "}
            <strong className="text-foreground">self-hosted server</strong> for
            every application imaginable, and building a{" "}
            <strong className="text-foreground">
              YC Bookface-style social platform for technical students across
              Europe
            </strong>{" "}
            in partnership with the European Industrial Society.
          </p>
        </div>

        {tiles.map((t, i) => {
          // i: 0=Make (top-mid), 1=Own (top-right), 2=Operate (bot-mid), 3=Ship (bot-right)
          const placement =
            i === 0
              ? "lg:col-start-2 lg:row-start-1"
              : i === 1
                ? "lg:col-start-3 lg:row-start-1"
                : i === 2
                  ? "lg:col-start-2 lg:row-start-2"
                  : "lg:col-start-3 lg:row-start-2";
          // Mobile: bottom border between stacked cells (except last).
          // Desktop: right border on middle column (Make, Operate) + bottom border on top row (Make, Own).
          const mobileBorder = i < 3 ? "border-b border-border" : "";
          const desktopRight =
            i === 0 || i === 2 ? "lg:border-r lg:border-border" : "";
          const desktopBottom = i < 2 ? "lg:border-b lg:border-border" : "";
          const desktopResetMobile = i >= 2 ? "lg:border-b-0" : "";
          return (
            <div
              key={t.label}
              className={`group relative p-8 sm:p-10 pb-16 transition-colors duration-300 hover:bg-card ${placement} ${mobileBorder} ${desktopResetMobile} ${desktopRight} ${desktopBottom}`}
            >
              <div className="flex items-center justify-between">
                <span className="bracket-label">{t.label}</span>
                <t.icon className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                {t.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {t.body}
              </p>
              <div className="absolute bottom-6 left-8 sm:left-10 font-mono text-[10px] tracking-widest text-muted-foreground/50">
                0{i + 1} / 04
              </div>
            </div>
          );
        })}
      </div>
    </SectionRow>
  );
}
