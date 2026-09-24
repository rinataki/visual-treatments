import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const ambient = String(params.ambient);
  const light = String(params.light);
  const size = Number(params.size);
  const x = Number(params.x);
  const y = Number(params.y);
  const core = Number(params.core);
  const falloff = Number(params.falloff);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: ambient,
        backgroundImage: `radial-gradient(circle ${size}px at ${x}% ${y}%, ${light} 0%, ${light} ${core}%, transparent ${falloff}%)`,
      }}
    />
  );
}
