import { defineTreatment } from "@/lib/treatment-schema";

// Diagonal stripes via a single repeating-linear-gradient. Pure CSS.
export const diagonalStripes = defineTreatment({
  name: "Diagonal Stripes",
  slug: "diagonal-stripes",
  category: "pattern",
  subcategory: "stripes",
  description: "Bold angled bands — hazard tape, awnings, sport.",
  feelings: ["playful", "editorial"],
  previewBackground: "#ffffff",

  controls: [
    { type: "range", key: "angle", label: "Angle", default: 45, min: 0, max: 180, unit: "deg" },
    { type: "range", key: "width", label: "Stripe width", default: 18, min: 4, max: 60, unit: "px" },
    { type: "color", key: "c1", label: "Color 1", default: "#111318" },
    { type: "color", key: "c2", label: "Color 2", default: "#ffffff" },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      code: `.diagonal-stripes {
  background-image: repeating-linear-gradient(
    {{angle}},
    {{c1}} 0,
    {{c1}} {{width}},
    {{c2}} {{width}},
    {{c2}} calc({{width}} * 2)
  );
}`,
    },
  ],
});
