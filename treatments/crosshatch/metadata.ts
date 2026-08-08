import { defineTreatment } from "@/lib/treatment-schema";

// Crosshatch: two diagonal line gradients at ±45°. Pure CSS drafting shading.
export const crosshatch = defineTreatment({
  name: "Crosshatch",
  slug: "crosshatch",
  category: "pattern",
  subcategory: "hatch",
  description: "Pen-and-ink crosshatch shading — editorial, hand-drawn feel.",
  feelings: ["editorial", "technical"],
  previewBackground: "#f7f4ec",

  controls: [
    { type: "range", key: "gap", label: "Spacing", default: 10, min: 4, max: 30, unit: "px" },
    { type: "range", key: "weight", label: "Line weight", default: 1, min: 1, max: 4, unit: "px" },
    { type: "color", key: "line", label: "Ink color", default: "#2b2b2b" },
    { type: "color", key: "bg", label: "Paper", default: "#f7f4ec" },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      code: `.crosshatch {
  background-color: {{bg}};
  background-image:
    repeating-linear-gradient(45deg, {{line}} 0, {{line}} {{weight}}, transparent {{weight}}, transparent {{gap}}),
    repeating-linear-gradient(-45deg, {{line}} 0, {{line}} {{weight}}, transparent {{weight}}, transparent {{gap}});
}`,
    },
  ],
});
