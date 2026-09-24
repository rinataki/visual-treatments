import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const fill = String(params.fill);
  const ink = String(params.ink);
  const cut = String(params.cut);
  const ring = Number(params.ring);
  const radius = Number(params.radius);
  const tilt = Number(params.tilt);
  const lift = Number(params.lift);
  const text = String(params.__text ?? "New!");

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
          display: "inline-block",
          padding: "0.45em 0.9em",
          fontSize: "clamp(24px, 7vw, 52px)",
          fontWeight: 800,
          lineHeight: 1.1,
          color: ink,
          background: fill,
          border: `${ring}px solid ${cut}`,
          borderRadius: `${radius}px`,
          transform: `rotate(${tilt}deg)`,
          boxShadow: `0 ${lift}px ${lift * 1.8}px rgba(15, 23, 42, 0.22)`,
        }}
      >
        {text}
      </span>
    </div>
  );
}
