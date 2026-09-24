import type { ParamValues } from "@/lib/treatment-schema";

export function Demo({ params }: { params: ParamValues }) {
  const blur = Number(params.blur);
  const saturate = Number(params.saturate);
  const tint = String(params.tint);
  const strength = Number(params.strength);
  const edge = Number(params.edge);
  const radius = Number(params.radius);

  const backdrop = `blur(${blur}px) saturate(${saturate}%)`;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Glass needs something to sample — color blobs behind the panel. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 22% 28%, #7c3aed 0%, transparent 46%)," +
            "radial-gradient(circle at 78% 22%, #06b6d4 0%, transparent 44%)," +
            "radial-gradient(circle at 62% 84%, #f59e0b 0%, transparent 48%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "68%",
          height: "56%",
          transform: "translate(-50%, -50%)",
          backdropFilter: backdrop,
          WebkitBackdropFilter: backdrop,
          backgroundColor: `color-mix(in srgb, ${tint} ${strength}%, transparent)`,
          border: `1px solid rgba(255, 255, 255, ${edge})`,
          borderRadius: radius,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.28)",
        }}
      />
    </div>
  );
}
