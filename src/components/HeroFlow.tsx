import { useEffect, useRef } from "react";

/**
 * ASCII globe — adapted from
 * https://codepen.io/Gabriel-Blauth/pen/MYjNxby
 *
 * Renders a rotating Earth as Braille glyphs onto a canvas, sampling a
 * specular Earth texture for land/ocean separation. Tuned to KTH Developer
 * brand colors (emerald continents over deep slate oceans).
 */

const CFG = {
  targetFps: 20,
  rows: 60,
  rowsMobile: 25,
  zoom: 1.05,
  rotationSpeed: 0.008,
  fontAspect: 0.6,
  lineHeight: 9,
  continentIntensity: 1,
  oceanIntensity: 0.25,
  continentColor: "#10B981", // emerald (brand primary)
  oceanColor: "#3B5BDB", // visible blue ocean
  textureUrl:
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
};

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const DOT_BITS = [1, 8, 2, 16, 4, 32, 64, 128];
const clamp = (v: number, a: number, b: number) =>
  Math.max(a, Math.min(b, v));

export default function HeroFlow() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const isMobile =
      matchMedia("(max-width:768px)").matches ||
      /Mobi|Android/i.test(navigator.userAgent);
    const rows = isMobile ? CFG.rowsMobile : CFG.rows;
    const cols = Math.round(rows / CFG.fontAspect);
    const W = cols * 2;
    const H = rows * 4;
    const frameDelay = 1000 / CFG.targetFps;

    const out = document.createElement("canvas");
    out.style.display = "block";
    out.style.height = "100%";
    out.style.width = "auto";
    out.style.borderRadius = "100%";
    out.style.background = "#000";
    host.appendChild(out);

    const img = new Image();
    img.crossOrigin = "";
    img.src = CFG.textureUrl;

    let raf = 0;
    let cancelled = false;

    img.onload = () => {
      if (cancelled) return;
      const src = document.createElement("canvas");
      const sctx = src.getContext("2d", { willReadFrequently: true })!;
      src.width = img.width;
      src.height = img.height;
      sctx.drawImage(img, 0, 0);
      const px = sctx.getImageData(0, 0, src.width, src.height).data;

      const outCtx = out.getContext("2d")!;
      const charWidth = (rows * CFG.lineHeight) / cols;
      out.width = cols * charWidth;
      out.height = rows * CFG.lineHeight;
      outCtx.font = "10px monospace";
      outCtx.textAlign = "center";
      outCtx.textBaseline = "middle";

      let rot = 0;
      let last = 0;

      const sample = (u: number, v: number) => {
        const x = clamp(Math.floor(u * src.width), 0, src.width - 1);
        const y = clamp(Math.floor(v * src.height), 0, src.height - 1);
        return px[(y * src.width + x) * 4] / 255;
      };

      const render = () => {
        outCtx.clearRect(0, 0, out.width, out.height);
        for (let r = 0; r < rows; r++) {
          const rowChars: string[] = new Array(cols).fill("\u2800");
          const rowLand: boolean[] = new Array(cols).fill(false);
          const rowHasSphere: boolean[] = new Array(cols).fill(false);
          for (let c = 0; c < cols; c++) {
            let code = 10240;
            let landScore = 0;
            let touchesSphere = false;
            for (let dy = 0; dy < 4; dy++) {
              for (let dx = 0; dx < 2; dx++) {
                const bit = dy * 2 + dx;
                const x = c * 2 + dx;
                const y = r * 4 + dy;
                const nx = ((x / (W - 1)) * 2 - 1) * CFG.zoom;
                const ny = -(((y / (H - 1)) * 2 - 1) * CFG.zoom);
                const d2 = nx * nx + ny * ny;
                if (d2 > 1) continue;
                touchesSphere = true;
                const nz = Math.sqrt(1 - d2);
                let u = (Math.atan2(nx, nz) + rot) / (Math.PI * 2);
                u -= Math.floor(u);
                const v = 0.5 - Math.asin(ny) / Math.PI;
                const bright = sample(u, v);
                const land =
                  Math.max(0, Math.min(1, 2.5 - bright * 5)) *
                  CFG.continentIntensity;
                const threshold = BAYER[(y % 4) * 4 + (x % 4)] / 16;
                if (land + bright * CFG.oceanIntensity > threshold) {
                  code |= DOT_BITS[bit];
                }
                landScore += land;
              }
            }
            rowChars[c] = String.fromCharCode(code);
            rowLand[c] = landScore > 0;
            rowHasSphere[c] = touchesSphere;
          }
          // anti-alias single-cell holes / spikes along land edges
          for (let c = 1; c < cols - 1; c++) {
            if (!rowLand[c] && rowLand[c - 1] && rowLand[c + 1])
              rowLand[c] = true;
            if (rowLand[c] && !rowLand[c - 1] && !rowLand[c + 1])
              rowLand[c] = false;
          }
          for (let c = 0; c < cols; c++) {
            if (!rowHasSphere[c]) continue;
            outCtx.fillStyle = rowLand[c]
              ? CFG.continentColor
              : CFG.oceanColor;
            outCtx.fillText(
              rowChars[c],
              c * charWidth + charWidth / 2,
              r * CFG.lineHeight + CFG.lineHeight / 2
            );
          }
        }
        rot += CFG.rotationSpeed;
      };

      const loop = (t: number) => {
        raf = requestAnimationFrame(loop);
        if (t - last >= frameDelay) {
          last = t;
          render();
        }
      };
      raf = requestAnimationFrame(loop);
    };

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (out.parentNode) out.parentNode.removeChild(out);
    };
  }, []);

  // Starfield via radial-gradients (also from the original pen).
  const stars = Array.from({ length: 99 })
    .map(
      () =>
        `radial-gradient(1px at ${Math.random() * 100}% ${
          Math.random() * 100
        }%, #fff, transparent)`
    )
    .join(",");

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: `${stars}, #000` }}
    >
      <div
        ref={hostRef}
        className="globe relative flex items-center justify-center"
        style={{ height: "98%", aspectRatio: "1 / 1" }}
      />
    </div>
  );
}
