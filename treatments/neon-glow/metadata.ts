import { defineTreatment } from "@/lib/treatment-schema";

// A neon tube is not one glow, it's a stack: a near-white core, a tight
// saturated halo, and a wide dim bloom. Real light falls off nonlinearly, so
// the three text-shadows are derived from one {{spread}} via calc() at ×1, ×2.5
// and ×6 instead of being three sliders the user has to keep in proportion.
//
// The core stays a separate color control because neon reads as *white glass
// full of colored light* — tinting the core kills the effect.

export const neonGlow = defineTreatment({
  name: "Neon Glow",
  slug: "neon-glow",
  category: "lighting",
  subcategory: "glow",
  description:
    "Letterforms lit like a neon tube — white-hot core, saturated halo, wide bloom.",
  feelings: ["playful", "experimental", "premium"],
  previewBackground: "#0b0b12",
  surface: "text",
  sampleText: "Neon",

  controls: [
    { type: "color", key: "core", label: "Tube core", default: "#fff6ff", help: "Keep this near-white — neon is white glass full of colored light." },
    { type: "color", key: "glow", label: "Glow", default: "#ff3df5" },
    { type: "range", key: "spread", label: "Spread", default: 8, min: 2, max: 28, unit: "px", help: "Drives all three glow layers in proportion." },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      note: "Only reads on a dark surface — glow needs darkness to bloom into.",
      code: `.neon-glow {
  color: {{core}};
  text-shadow:
    0 0 {{spread}} {{glow}},
    0 0 calc({{spread}} * 2.5) {{glow}},
    0 0 calc({{spread}} * 6) {{glow}};
}`,
    },
  ],
});
