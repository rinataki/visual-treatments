import { defineTreatment } from "@/lib/treatment-schema";

// Glass is the one material that can't be painted — it has to *sample what's
// behind it*. That's `backdrop-filter`, and it means this treatment only reads
// correctly over busy content; over a flat fill it collapses into a tinted box.
//
// The tint is deliberately a color control plus a separate strength range fed
// through color-mix(), rather than an rgba() the user has to hand-edit: pickers
// only speak hex, and color-mix keeps the copied CSS readable.
//
// The hairline border is what sells it. Glass has an edge; a tinted rectangle
// doesn't.

export const frostedGlass = defineTreatment({
  name: "Frosted Glass",
  slug: "frosted-glass",
  category: "material",
  subcategory: "glass",
  description:
    "A blurred, tinted glass panel that samples and softens whatever sits behind it.",
  feelings: ["premium", "minimal"],
  previewBackground: "#0b1020",

  controls: [
    { type: "range", key: "blur", label: "Blur", default: 16, min: 0, max: 40, unit: "px" },
    { type: "range", key: "saturate", label: "Saturation", default: 160, min: 100, max: 220, unit: "%", help: "Pushing past 100% keeps colors alive through the blur." },
    { type: "color", key: "tint", label: "Tint", default: "#ffffff" },
    { type: "range", key: "strength", label: "Tint strength", default: 12, min: 0, max: 60, unit: "%" },
    { type: "range", key: "edge", label: "Edge highlight", default: 0.28, min: 0, max: 0.8, step: 0.01, help: "The hairline that makes it read as glass and not a tinted box." },
    { type: "range", key: "radius", label: "Corner radius", default: 20, min: 0, max: 48, unit: "px" },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      note: "Needs content behind it — over a flat fill there is nothing to frost.",
      code: `.frosted-glass {
  backdrop-filter: blur({{blur}}) saturate({{saturate}});
  -webkit-backdrop-filter: blur({{blur}}) saturate({{saturate}});
  background-color: color-mix(in srgb, {{tint}} {{strength}}, transparent);
  border: 1px solid rgba(255, 255, 255, {{edge}});
  border-radius: {{radius}};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.28);
}`,
    },
  ],
});
