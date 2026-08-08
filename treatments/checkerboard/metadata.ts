import { defineTreatment } from "@/lib/treatment-schema";

// Checkerboard from a single repeating conic-gradient. Pure CSS.
export const checkerboard = defineTreatment({
  name: "Checkerboard",
  slug: "checkerboard",
  category: "pattern",
  subcategory: "checkerboard",
  description: "The classic two-tone checker — one conic gradient, no images.",
  feelings: ["playful", "minimal"],
  previewBackground: "#ffffff",

  controls: [
    { type: "range", key: "scale", label: "Scale", default: 40, min: 12, max: 120, unit: "px" },
    { type: "color", key: "c1", label: "Color 1", default: "#111318" },
    { type: "color", key: "c2", label: "Color 2", default: "#ffffff" },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      code: `.checkerboard {
  background-color: {{c1}};
  background-image: repeating-conic-gradient({{c2}} 0% 25%, {{c1}} 0% 50%);
  background-size: {{scale}} {{scale}};
}`,
    },
  ],
});
