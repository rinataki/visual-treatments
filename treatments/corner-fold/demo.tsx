import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const face = String(params.face);
  const flap = String(params.flap);
  const size = Number(params.size);
  const shade = Number(params.shade);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "70%",
          height: "78%",
          background: face,
          clipPath: `polygon(0 0, 100% 0, 100% calc(100% - ${size}px), calc(100% - ${size}px) 100%, 0 100%)`,
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: size,
            height: size,
            background: flap,
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
            filter: `drop-shadow(-2px -2px 4px rgba(15, 23, 42, ${shade}))`,
          }}
        />
      </div>
    </div>
  );
}
