import type { ParamValues } from "@/lib/treatment-schema";

const TILE =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='4' height='4' shape-rendering='crispEdges'><g fill='black'><rect x='0' y='0' width='1' height='1'/><rect x='2' y='0' width='1' height='1'/><rect x='1' y='1' width='1' height='1'/><rect x='0' y='2' width='1' height='1'/><rect x='2' y='2' width='1' height='1'/><rect x='3' y='3' width='1' height='1'/></g></svg>";

export function Demo({ params }: { params: ParamValues }) {
  const scale = Number(params.scale);
  const bg = String(params.bg);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: bg,
        backgroundImage: `url("${TILE}")`,
        backgroundSize: `${scale}px ${scale}px`,
        imageRendering: "pixelated",
      }}
    />
  );
}
