import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const color = String(params.color);
  const strength = Number(params.strength);
  const length = Number(params.length);
  const width = Number(params.width);
  const tilt = Number(params.tilt);
  const fibre = Number(params.fibre);

  const torn = `linear-gradient(90deg, transparent 0, #000 10px, #000 calc(100% - 10px), transparent 100%)`;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Something for the tape to hold down, so the translucency reads. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "46%",
          height: "58%",
          transform: "translate(-50%, -50%) rotate(2deg)",
          background: "#ffffff",
          boxShadow: "0 2px 10px rgba(15, 23, 42, 0.12)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: `${length}%`,
          height: `${width}px`,
          transform: `translate(-50%, -50%) rotate(${tilt}deg)`,
          pointerEvents: "none",
          backgroundColor: `color-mix(in srgb, ${color} ${strength}%, transparent)`,
          mixBlendMode: "multiply",
          backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0 1px, transparent 1px ${fibre}px)`,
          maskImage: torn,
          WebkitMaskImage: torn,
          boxShadow: "0 1px 3px rgba(15, 23, 42, 0.16)",
        }}
      />
    </div>
  );
}
