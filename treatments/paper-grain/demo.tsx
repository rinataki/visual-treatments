import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const opacity = Number(params.opacity);
  const grain = Number(params.grain); // feTurbulence baseFrequency (0.4–1.0)
  const tint = String(params.tint);
  const blend = String(params.blend); // "multiply" | "normal"

  const noise =
    `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'>` +
    `<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${grain}' numOctaves='2'/></filter>` +
    `<rect width='100%25' height='100%25' filter='url(%23n)'/></svg>`;

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
        mixBlendMode: blend as React.CSSProperties["mixBlendMode"],
        backgroundColor: tint,
        backgroundBlendMode: "multiply",
        backgroundImage: `url("${noise}")`,
      }}
    />
  );
}
