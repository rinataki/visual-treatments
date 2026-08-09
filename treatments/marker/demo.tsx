import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const start = Number(params.start);
  const color = String(params.color);
  const text = String(params.__text ?? "Marker");
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span
        style={{
          fontSize: "clamp(32px, 9vw, 72px)",
          fontWeight: 700,
          color: "#111318",
          backgroundImage: `linear-gradient(180deg, transparent ${start}%, ${color} ${start}%)`,
          padding: "0 0.15em",
        }}
      >
        {text}
      </span>
    </div>
  );
}
