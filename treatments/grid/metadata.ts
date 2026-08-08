import { defineTreatment } from "@/lib/treatment-schema";

// Graph-paper grid: two repeating line gradients, one per axis. Pure CSS.
export const grid = defineTreatment({
  name: "Grid",
  slug: "grid",
  category: "pattern",
  subcategory: "grid",
  description: "Graph-paper ruling — the quiet backdrop for anything technical.",
  feelings: ["technical", "minimal"],
  previewBackground: "#ffffff",

  controls: [
    { type: "range", key: "size", label: "Cell size", default: 24, min: 8, max: 80, unit: "px" },
    { type: "range", key: "weight", label: "Line weight", default: 1, min: 1, max: 4, unit: "px" },
    { type: "color", key: "line", label: "Line color", default: "#cdd3da" },
    { type: "color", key: "bg", label: "Background", default: "#ffffff" },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      code: `.grid {
  background-color: {{bg}};
  background-image:
    linear-gradient({{line}} {{weight}}, transparent {{weight}}),
    linear-gradient(90deg, {{line}} {{weight}}, transparent {{weight}});
  background-size: {{size}} {{size}};
}`,
    },
  ],
});
