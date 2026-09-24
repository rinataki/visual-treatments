import type { ParamValues } from "@/lib/treatment-schema";

// Keyframes can't live in an inline style attribute, so the demo ships the
// @keyframes rule alongside the animated layer. The name is globally unique.
const KEYFRAMES = `
@keyframes vt-grain-boil {
  0%   { transform: translate(0, 0); }
  12%  { transform: translate(-8%, 4%); }
  25%  { transform: translate(6%, -9%); }
  37%  { transform: translate(-4%, -6%); }
  50%  { transform: translate(9%, 5%); }
  62%  { transform: translate(-7%, 8%); }
  75%  { transform: translate(3%, -4%); }
  87%  { transform: translate(-9%, -2%); }
  100% { transform: translate(0, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .vt-grain-layer { animation: none !important; }
}`;

export function Demo({ params }: { params: ParamValues }) {
  const opacity = Number(params.opacity);
  const grain = Number(params.grain); // feTurbulence baseFrequency
  const tint = String(params.tint);
  const rate = Number(params.rate);

  const noise =
    `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'>` +
    `<filter id='g'><feTurbulence type='fractalNoise' baseFrequency='${grain}' numOctaves='2'/></filter>` +
    `<rect width='100%25' height='100%25' filter='url(%23g)'/></svg>`;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <style>{KEYFRAMES}</style>
      <div
        aria-hidden
        className="vt-grain-layer"
        style={{
          position: "absolute",
          inset: "-50%",
          pointerEvents: "none",
          opacity,
          backgroundColor: tint,
          backgroundBlendMode: "multiply",
          backgroundImage: `url("${noise}")`,
          animation: `vt-grain-boil ${rate}s steps(1) infinite`,
        }}
      />
    </div>
  );
}
