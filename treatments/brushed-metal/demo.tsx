import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const base = String(params.base);
  const angle = Number(params.angle);
  const pitch = Number(params.pitch);
  const grain = Number(params.grain);
  const sheen = Number(params.sheen);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: base,
        backgroundImage:
          `linear-gradient(${angle + 90}deg, rgba(255,255,255,${sheen}) 0%, rgba(255,255,255,0) 26%, rgba(0,0,0,0.22) 54%, rgba(255,255,255,0) 76%, rgba(255,255,255,${sheen * 0.6}) 100%),` +
          `repeating-linear-gradient(${angle}deg, rgba(255,255,255,${grain}) 0 1px, transparent 1px ${pitch * 2.7}px),` +
          `repeating-linear-gradient(${angle}deg, rgba(255,255,255,${grain * 0.55}) 0 1px, rgba(0,0,0,${grain * 0.55}) 1px 2px, transparent 2px ${pitch}px)`,
      }}
    />
  );
}
