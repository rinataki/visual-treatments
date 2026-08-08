import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const size = Number(params.size);
  const weight = Number(params.weight);
  const line = String(params.line);
  const bg = String(params.bg);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: bg,
        backgroundImage: `linear-gradient(${line} ${weight}px, transparent ${weight}px), linear-gradient(90deg, ${line} ${weight}px, transparent ${weight}px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}
