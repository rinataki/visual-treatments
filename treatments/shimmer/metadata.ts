import { defineTreatment } from "@/lib/treatment-schema";

// The skeleton-loader sweep. A soft band of light travels across a flat fill.
//
// Two decisions carry it. First, the band is a *background-position* animation
// on a no-repeat gradient, not a translated child — one element, no wrapper, no
// overflow to manage. Second, the gradient's edges are transparent rather than
// hard-stopped, so the sweep has no leading seam.
//
// `span` appears in the size and in the negative start offset, so `-{{span}}`
// substitutes to a valid literal (`-60%`) and the band always begins fully
// off-stage no matter how wide it is.

export const shimmer = defineTreatment({
  name: "Shimmer",
  slug: "shimmer",
  category: "motion",
  subcategory: "sweep",
  description:
    "A soft band of light sweeping across a surface — the honest skeleton loader.",
  feelings: ["minimal", "premium", "technical"],
  previewBackground: "#e8eaee",

  controls: [
    { type: "color", key: "base", label: "Base", default: "#e2e5ea" },
    { type: "color", key: "sheen", label: "Sheen", default: "#ffffff" },
    { type: "range", key: "span", label: "Band width", default: 60, min: 20, max: 140, unit: "%" },
    { type: "range", key: "tilt", label: "Tilt", default: 100, min: 60, max: 120, unit: "deg", help: "Just off vertical. 90deg reads mechanical." },
    { type: "range", key: "rate", label: "Duration", default: 1.8, min: 0.6, max: 4, step: 0.1, unit: "s" },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      note: "One element, no wrapper. Put it on the skeleton block itself.",
      code: `.shimmer {
  background-color: {{base}};
  background-repeat: no-repeat;
  background-size: {{span}} 100%;
  background-image: linear-gradient(
    {{tilt}},
    transparent 0%,
    {{sheen}} 50%,
    transparent 100%
  );
  animation: shimmer-sweep {{rate}} linear infinite;
}

@keyframes shimmer-sweep {
  from { background-position: -{{span}} 0; }
  to   { background-position: 200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .shimmer {
    animation: none;
    background-image: none;
  }
}`,
    },
  ],
});
