import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const weight = Number(params.weight);
  const color = String(params.color);
  const text = String(params.__text ?? "Outline");
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span
        style={{
          fontSize: "clamp(32px, 9vw, 76px)",
          fontWeight: 700,
          color: "transparent",
          WebkitTextStroke: `${weight}px ${color}`,
        }}
      >
        {text}
      </span>
    </div>
  );
}
