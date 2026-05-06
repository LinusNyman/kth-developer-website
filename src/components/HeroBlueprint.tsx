import { useEffect, useState } from "react";

/**
 * Animated ASCII / SVG blueprint of the stack — draws itself in stages,
 * then loops. Pure SVG, no WebGL.
 *
 * Stages:
 *  0: nothing
 *  1: client node + label
 *  2: line client→api
 *  3: api node + label
 *  4: line api→db, db node
 *  5: branch api→infra, infra node
 *  6: branch infra→self-hosted, self-hosted node
 *  7: all "live" pulse
 */
const STAGE_MS = 700;
const STAGES = 8;

export default function HeroBlueprint() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStage((s) => (s + 1) % (STAGES + 4)); // hold "live" state a few beats
    }, STAGE_MS);
    return () => clearInterval(id);
  }, []);

  const visible = (s: number) => stage >= s;
  const live = stage >= STAGES - 1;

  const node = (
    x: number,
    y: number,
    label: string,
    show: boolean,
    accent = false,
  ) => (
    <g
      style={{
        opacity: show ? 1 : 0,
        transition: "opacity 280ms ease-out",
      }}
    >
      <rect
        x={x - 46}
        y={y - 14}
        width={92}
        height={28}
        fill="hsl(0 0% 0%)"
        stroke={accent ? "hsl(160 84% 39%)" : "hsl(0 0% 60%)"}
        strokeWidth={1}
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontFamily="Geist, ui-monospace, monospace"
        fontSize={11}
        fill={accent ? "hsl(160 84% 50%)" : "hsl(0 0% 90%)"}
        letterSpacing={1.2}
      >
        {label}
      </text>
      {live && accent && (
        <circle
          cx={x + 38}
          cy={y - 8}
          r={2.5}
          fill="hsl(160 84% 50%)"
        >
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="1.6s"
            repeatCount="indefinite"
          />
        </circle>
      )}
    </g>
  );

  // Animated stroke line with dash draw-in
  const line = (
    d: string,
    show: boolean,
    key: string,
    length = 200,
  ) => (
    <path
      key={key}
      d={d}
      fill="none"
      stroke="hsl(160 84% 39% / 0.7)"
      strokeWidth={1}
      strokeDasharray={length}
      strokeDashoffset={show ? 0 : length}
      style={{
        transition: "stroke-dashoffset 500ms ease-out",
      }}
    />
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        viewBox="0 0 720 320"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ maxWidth: 880 }}
      >
        {/* Top: client */}
        {node(360, 40, "FRONTEND", visible(1))}

        {/* line client → api */}
        {line("M 360 54 L 360 120", visible(2), "l1", 70)}

        {/* api node */}
        {node(360, 140, "API", visible(3), true)}

        {/* line api → db */}
        {line("M 360 154 L 360 220", visible(4), "l2", 70)}
        {node(360, 240, "DATABASE", visible(4))}

        {/* branch api → infra (left) */}
        {line("M 314 140 L 200 140", visible(5), "l3", 120)}
        {node(154, 140, "INFRA", visible(5), true)}

        {/* branch api → self-hosted (right) */}
        {line("M 406 140 L 520 140", visible(6), "l4", 120)}
        {node(566, 140, "SELF-HOSTED", visible(6), true)}

        {/* corner ticks */}
        <g stroke="hsl(0 0% 30%)" strokeWidth={1}>
          <path d="M 4 4 L 16 4 M 4 4 L 4 16" />
          <path d="M 716 4 L 704 4 M 716 4 L 716 16" />
          <path d="M 4 316 L 16 316 M 4 316 L 4 304" />
          <path d="M 716 316 L 704 316 M 716 316 L 716 304" />
        </g>

        {/* status text */}
        <text
          x={20}
          y={300}
          fontFamily="Geist, ui-monospace, monospace"
          fontSize={10}
          fill="hsl(0 0% 50%)"
          letterSpacing={2}
        >
          {live
            ? "▸ STATUS: LIVE — STOCKHOLM · fra1.kthd.se"
            : "▸ BUILDING STACK…"}
        </text>
        <text
          x={700}
          y={300}
          textAnchor="end"
          fontFamily="Geist, ui-monospace, monospace"
          fontSize={10}
          fill="hsl(160 84% 50%)"
          letterSpacing={2}
        >
          {live ? "✓ SHIPPED" : ""}
        </text>
      </svg>
    </div>
  );
}
