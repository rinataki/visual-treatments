import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const core = String(params.core);
  const glow = String(params.glow);
  const spread = Number(params.spread);
  const text = String(params.__text ?? "Neon");

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize: "clamp(32px, 9vw, 72px)",
          fontWeight: 700,
          letterSpacing: "0.04em",
          color: core,
          textShadow: `0 0 ${spread}px ${glow}, 0 0 ${spread * 2.5}px ${glow}, 0 0 ${spread * 6}px ${glow}`,
        }}
      >
        {text}
      </span>
    </div>
  );
}
