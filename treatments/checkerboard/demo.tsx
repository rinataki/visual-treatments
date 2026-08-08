import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const scale = Number(params.scale);
  const c1 = String(params.c1);
  const c2 = String(params.c2);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: c1,
        backgroundImage: `repeating-conic-gradient(${c2} 0% 25%, ${c1} 0% 50%)`,
        backgroundSize: `${scale}px ${scale}px`,
      }}
    />
  );
}
