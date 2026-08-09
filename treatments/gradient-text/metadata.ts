import { defineTreatment } from "@/lib/treatment-schema";

// Gradient-filled text via background-clip: text. Font-agnostic.
export const gradientText = defineTreatment({
  name: "Gradient Text",
  slug: "gradient-text",
  category: "typography",
  subcategory: "fill",
  description: "A smooth color gradient poured into the letterforms.",
  feelings: ["playful", "premium"],
  previewBackground: "#ffffff",
  surface: "text",
  sampleText: "Gradient",

  controls: [
    { type: "range", key: "angle", label: "Angle", default: 90, min: 0, max: 360, unit: "deg" },
    { type: "color", key: "c1", label: "Color 1", default: "#7c3aed" },
    { type: "color", key: "c2", label: "Color 2", default: "#ec4899" },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      note: "Clips a gradient to the text; the font is yours.",
      code: `.gradient-text {
  background: linear-gradient({{angle}}, {{c1}}, {{c2}});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}`,
    },
  ],
});
