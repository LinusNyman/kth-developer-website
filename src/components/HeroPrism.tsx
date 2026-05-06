import { useEffect, useRef } from "react";

declare global {
  interface Window {
    __mementoMoriLoaded?: boolean;
  }
}

export default function HeroPrism() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.__mementoMoriLoaded) return;
    window.__mementoMoriLoaded = true;

    const s = document.createElement("script");
    s.src = "/lib/memento-mori.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="canvas-wrap absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ margin: 0, borderRadius: 0, boxShadow: "none" }}
    >
      <canvas id="canvas" style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
