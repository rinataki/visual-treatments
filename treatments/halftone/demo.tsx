import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const dotsize = Number(params.dotsize);
  const gap = Number(params.gap);
  const angle = Number(params.angle);
  const dot = String(params.dot);
  const bg = String(params.bg);
  const mask = `linear-gradient(${angle}deg, #000, transparent)`;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: bg,
        backgroundImage: `radial-gradient(${dot} ${dotsize}px, transparent ${dotsize}px)`,
        backgroundSize: `${gap}px ${gap}px`,
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
    />
  );
}
