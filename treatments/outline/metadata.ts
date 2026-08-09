import { defineTreatment } from "@/lib/treatment-schema";

// Hollow / outlined text. Font-agnostic — works on whatever typeface you set.
export const outline = defineTreatment({
  name: "Outline",
  slug: "outline",
  category: "typography",
  subcategory: "outline",
  description: "Hollow, stroked letterforms — bold and editorial on any font.",
  feelings: ["editorial", "minimal"],
  previewBackground: "#ffffff",
  surface: "text",
  sampleText: "Outline",

  controls: [
    { type: "range", key: "weight", label: "Stroke weight", default: 2, min: 1, max: 6, unit: "px" },
    { type: "color", key: "color", label: "Stroke color", default: "#111318" },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      note: "Apply to any text element; the font is yours.",
      code: `.outline {
  color: transparent;
  -webkit-text-stroke: {{weight}} {{color}};
}`,
    },
  ],
});
