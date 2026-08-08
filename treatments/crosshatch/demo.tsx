import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const gap = Number(params.gap);
  const weight = Number(params.weight);
  const line = String(params.line);
  const bg = String(params.bg);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: bg,
        backgroundImage: `repeating-linear-gradient(45deg, ${line} 0, ${line} ${weight}px, transparent ${weight}px, transparent ${gap}px), repeating-linear-gradient(-45deg, ${line} 0, ${line} ${weight}px, transparent ${weight}px, transparent ${gap}px)`,
      }}
    />
  );
}
