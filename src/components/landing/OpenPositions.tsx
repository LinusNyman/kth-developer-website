import { useOpenPositions } from "@/hooks/useOpportunitiesData";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Committee } from "@/data/opportunities";
import SectionHeader from "./SectionHeader";
import SectionRow from "./SectionFrame";

const committeeBadgeClass = (_c: Committee) =>
  "bg-black text-white border-transparent hover:bg-black";

const committeeOrder: Record<Committee, number> = {
  Board: 0,
  Development: 1,
  Operations: 2,
};

export default function OpenPositions() {
  const { data: positionsRaw = [], isLoading } = useOpenPositions();
  const positions = [...positionsRaw].sort((a, b) => {
    const c = committeeOrder[a.committee] - committeeOrder[b.committee];
    return c !== 0 ? c : a.role.localeCompare(b.role);
  });

  return (
    <SectionRow
      id="positions"
      index="03"
      label="Specific Roles"
      meta={`OPEN ${String(positions.length).padStart(2, "0")}`}
    >
      <SectionHeader title="Open Positions" />

      {isLoading ? (
        <div className="mt-12 -mx-5 sm:-mx-10 -mb-16 sm:-mb-24 divide-y divide-border border-t border-border">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="p-8 sm:p-10">
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      ) : positions.length === 0 ? (
        <div className="mt-12 border border-border bg-background p-10 text-center font-mono text-sm text-muted-foreground">
          <span className="text-primary">$</span> ls ./positions
          <div className="mt-2 text-xs text-muted-foreground/70">
            No open positions right now — general applications are still
            welcome.
          </div>
        </div>
      ) : (
        <div className="mt-12 -mx-5 sm:-mx-10 -mb-16 sm:-mb-24 divide-y divide-border border-t border-border">
          {positions.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                const committeeKey = p.committee.toLowerCase();
                window.dispatchEvent(
                  new CustomEvent("apply:prefill", {
                    detail: {
                      committee: committeeKey,
                      positionId: p.id,
                    },
                  }),
                );
                document
                  .getElementById("join")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group w-full text-left p-8 sm:p-10 flex flex-col transition-colors duration-300 hover:bg-card"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight">
                    {p.role}
                  </h3>
                </div>
                <Badge className={committeeBadgeClass(p.committee)}>
                  {p.committee}
                </Badge>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {p.description}
              </p>
              <div className="mt-6 font-mono text-[11px] tracking-[0.2em] uppercase text-primary/60 group-hover:text-primary transition-colors">
                Apply for this role ─→
              </div>
            </button>
          ))}
        </div>
      )}
    </SectionRow>
  );
}
