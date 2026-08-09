import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const angle = Number(params.angle);
  const c1 = String(params.c1);
  const c2 = String(params.c2);
  const text = String(params.__text ?? "Gradient");
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span
        style={{
          fontSize: "clamp(32px, 9vw, 72px)",
          fontWeight: 700,
          backgroundImage: `linear-gradient(${angle}deg, ${c1}, ${c2})`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {text}
      </span>
    </div>
  );
}
