import { useEffect, useRef } from "react";

declare global {
  interface Window {
    __mementoMoriLoaded?: boolean;
    __mmPaused?: boolean;
  }
}

export default function HeroPrism() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    if (!window.__mementoMoriLoaded) {
      window.__mementoMoriLoaded = true;
      const inject = () => {
        const s = document.createElement("script");
        s.src = "/lib/memento-mori.js";
        s.async = true;
        document.body.appendChild(s);
      };
      const ric: typeof requestIdleCallback | undefined = (window as any).requestIdleCallback;
      if (ric) ric(inject, { timeout: 800 });
      else setTimeout(inject, 200);
    }

    // Pause when scrolled offscreen
    const el = wrapRef.current;
    let visible = true;
    const sync = () => {
      window.__mmPaused = !visible || document.hidden;
    };
    const io = el
      ? new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            sync();
          },
          { threshold: 0.01 }
        )
      : null;
    if (io && el) io.observe(el);
    const onVis = () => sync();
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.__mmPaused = false;
    };
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
