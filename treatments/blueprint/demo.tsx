import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const size = Number(params.size);
  const weight = Number(params.weight);
  const minor = String(params.minor);
  const major = String(params.major);
  const bg = String(params.bg);
  const major5 = size * 5;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: bg,
        backgroundImage: `linear-gradient(${minor} ${weight}px, transparent ${weight}px), linear-gradient(90deg, ${minor} ${weight}px, transparent ${weight}px), linear-gradient(${major} ${weight}px, transparent ${weight}px), linear-gradient(90deg, ${major} ${weight}px, transparent ${weight}px)`,
        backgroundSize: `${size}px ${size}px, ${size}px ${size}px, ${major5}px ${major5}px, ${major5}px ${major5}px`,
      }}
    />
  );
}
