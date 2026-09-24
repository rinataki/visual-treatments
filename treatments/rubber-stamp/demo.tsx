import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const ink = String(params.ink);
  const weight = Number(params.weight);
  const tilt = Number(params.tilt);
  const fade = Number(params.fade);
  const distress = Number(params.distress); // feTurbulence baseFrequency
  const bite = Number(params.bite);
  const text = String(params.__text ?? "Approved");

  const mask =
    `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'>` +
    `<filter id='s'><feTurbulence type='fractalNoise' baseFrequency='${distress}' numOctaves='3'/>` +
    `<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 4 -${bite}'/></filter>` +
    `<rect width='100%25' height='100%25' filter='url(%23s)'/></svg>")`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          display: "inline-block",
          padding: "0.3em 0.7em",
          fontSize: "clamp(22px, 6vw, 46px)",
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ink,
          border: `${weight}px solid ${ink}`,
          borderRadius: 6,
          opacity: fade,
          transform: `rotate(${tilt}deg)`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {text}
      </span>
    </div>
  );
}
