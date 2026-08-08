import { defineTreatment } from "@/lib/treatment-schema";

// The simple case: pure CSS. The declaration block carries {{tokens}} that the
// playground substitutes with current values, so the copied snippet reflects
// what you see — while the body stays var()-based and hand-tweakable.

export const dotGrid = defineTreatment({
  name: "Dot Grid",
  slug: "dot-grid",
  category: "pattern",
  subcategory: "dots",
  description: "A clean radial-gradient dot grid — the workhorse technical backdrop.",
  feelings: ["technical", "minimal"],
  previewBackground: "#0b0c0e",

  controls: [
    { type: "range", key: "gap", label: "Spacing", default: 24, min: 8, max: 64, unit: "px" },
    { type: "range", key: "size", label: "Dot size", default: 1.5, min: 0.5, max: 4, step: 0.5, unit: "px" },
    { type: "color", key: "color", label: "Dot color", default: "#2a2d33" },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      code: `.dot-grid {
  --gap: {{gap}};
  --size: {{size}};
  --color: {{color}};

  background-image: radial-gradient(var(--color) var(--size), transparent var(--size));
  background-size: var(--gap) var(--gap);
}`,
    },
  ],
});
