import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const angle = Number(params.angle);
  const width = Number(params.width);
  const c1 = String(params.c1);
  const c2 = String(params.c2);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `repeating-linear-gradient(${angle}deg, ${c1} 0, ${c1} ${width}px, ${c2} ${width}px, ${c2} ${width * 2}px)`,
      }}
    />
  );
}
