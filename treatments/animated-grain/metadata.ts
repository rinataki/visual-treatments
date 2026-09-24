import { defineTreatment } from "@/lib/treatment-schema";

// Film grain that *boils*. The trick is that nothing re-renders: one oversized
// noise tile is jogged around behind a clipping parent, so each keyframe shows
// a different patch of the same static texture. That's a compositor-only
// transform — no repaint, no filter re-evaluation, no JS.
//
// `steps(1)` is doing the real work. Grain that eases between positions reads
// as a sliding sheet; grain that *snaps* reads as film. Never interpolate it.
//
// Ships with a prefers-reduced-motion guard, because a boiling full-bleed
// texture is exactly the kind of thing that guard exists for.

export const animatedGrain = defineTreatment({
  name: "Animated Grain",
  slug: "animated-grain",
  category: "motion",
  subcategory: "grain",
  description:
    "Film grain that boils — a single noise tile jogged on a step timing function.",
  feelings: ["editorial", "tactile", "experimental"],
  previewBackground: "#f4f1ea",

  controls: [
    { type: "range", key: "opacity", label: "Opacity", default: 0.35, min: 0, max: 1, step: 0.01 },
    { type: "range", key: "grain", label: "Grain size", default: 0.8, min: 0.4, max: 1, step: 0.01, help: "Higher = finer, denser grain." },
    { type: "color", key: "tint", label: "Tint", default: "#6b7280" },
    { type: "range", key: "rate", label: "Cycle", default: 0.8, min: 0.2, max: 3, step: 0.1, unit: "s", help: "One pass through the eight grain positions. Real film is fast — under 1s." },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      note: "Transform-only animation — stays on the compositor. The best default.",
      code: `.animated-grain {
  position: relative;
  overflow: hidden;
}

.animated-grain::after {
  content: "";
  position: absolute;
  /* Oversized so the jog never exposes an edge. */
  inset: -50%;
  pointer-events: none;
  opacity: {{opacity}};
  background-color: {{tint}};
  background-blend-mode: multiply;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='{{grain}}' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23g)'/></svg>");
  /* steps(1) — grain must SNAP between positions, never tween. */
  animation: grain-boil {{rate}} steps(1) infinite;
}

@keyframes grain-boil {
  0%   { transform: translate(0, 0); }
  12%  { transform: translate(-8%, 4%); }
  25%  { transform: translate(6%, -9%); }
  37%  { transform: translate(-4%, -6%); }
  50%  { transform: translate(9%, 5%); }
  62%  { transform: translate(-7%, 8%); }
  75%  { transform: translate(3%, -4%); }
  87%  { transform: translate(-9%, -2%); }
  100% { transform: translate(0, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .animated-grain::after { animation: none; }
}`,
    },
  ],
});
