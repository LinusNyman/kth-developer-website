import { useEffect, useState } from "react";
import {
  GENERAL_MEETING_DATE,
  GENERAL_MEETING_DATE_DISPLAY,
} from "@/lib/site-config";
import SectionRow from "./SectionFrame";

function getRemaining() {
  const diff = Math.max(0, GENERAL_MEETING_DATE.getTime() - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { diff, days, hours, minutes, seconds };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export default function Countdown() {
  const [t, setT] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setT(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const passed = t.diff === 0;

  const tiles = [
    { label: "Days", value: String(t.days) },
    { label: "Hours", value: pad(t.hours) },
    { label: "Minutes", value: pad(t.minutes) },
    { label: "Seconds", value: pad(t.seconds) },
  ];

  return (
    <SectionRow
      id="countdown"
      index="00"
      label="Countdown"
      meta={`GENERAL MEETING · ${GENERAL_MEETING_DATE_DISPLAY.toUpperCase()}`}
    >
      {passed ? (
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold">
          <span className="text-gradient-red caret">We're live.</span>
        </h2>
      ) : (
        <div className="-mx-5 -my-16 sm:-mx-10 sm:-my-24 grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-border">
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className="p-8 sm:p-12 text-center transition-colors hover:bg-card first:border-l-0"
            >
              <div className="font-extrabold tabular-nums text-5xl sm:text-6xl md:text-7xl leading-none">
                {tile.value}
              </div>
              <div className="mt-4 font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground">
                {tile.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionRow>
  );
}
