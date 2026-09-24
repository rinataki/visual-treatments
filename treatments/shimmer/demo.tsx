import type { ParamValues } from "@/lib/treatment-schema";

// @keyframes can't be expressed inline. `span` varies per-render, so the start
// offset is a CSS custom property the static keyframe rule reads.
const KEYFRAMES = `
@keyframes vt-shimmer-sweep {
  from { background-position: var(--vt-shimmer-start) 0; }
  to   { background-position: 200% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .vt-shimmer { animation: none !important; background-image: none !important; }
}`;

export function Demo({ params }: { params: ParamValues }) {
  const base = String(params.base);
  const sheen = String(params.sheen);
  const span = Number(params.span);
  const tilt = Number(params.tilt);
  const rate = Number(params.rate);

  const bar = (width: string): React.CSSProperties => ({
    width,
    height: 16,
    borderRadius: 8,
    backgroundColor: base,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${span}% 100%`,
    backgroundImage: `linear-gradient(${tilt}deg, transparent 0%, ${sheen} 50%, transparent 100%)`,
    animation: `vt-shimmer-sweep ${rate}s linear infinite`,
    ["--vt-shimmer-start" as string]: `-${span}%`,
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 14,
        padding: "0 12%",
      }}
    >
      <style>{KEYFRAMES}</style>
      <div className="vt-shimmer" style={{ ...bar("100%"), height: 72, borderRadius: 12 }} />
      <div className="vt-shimmer" style={bar("100%")} />
      <div className="vt-shimmer" style={bar("78%")} />
      <div className="vt-shimmer" style={bar("52%")} />
    </div>
  );
}
