import { defineTreatment } from "@/lib/treatment-schema";

// Blueprint grid: fine minor grid + bolder major grid (5× the cell), both axes.
// Pure CSS — four line gradients, calc() for the major spacing.
export const blueprint = defineTreatment({
  name: "Blueprint",
  slug: "blueprint",
  category: "pattern",
  subcategory: "grid",
  description: "Drafting-paper grid with major and minor rules on a deep field.",
  feelings: ["technical", "premium"],
  previewBackground: "#0a2540",

  controls: [
    { type: "range", key: "size", label: "Cell size", default: 22, min: 10, max: 60, unit: "px" },
    { type: "range", key: "weight", label: "Line weight", default: 1, min: 1, max: 3, unit: "px" },
    { type: "color", key: "minor", label: "Minor line", default: "#14456b" },
    { type: "color", key: "major", label: "Major line", default: "#2f6f9f" },
    { type: "color", key: "bg", label: "Background", default: "#0a2540" },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      code: `.blueprint {
  background-color: {{bg}};
  background-image:
    linear-gradient({{minor}} {{weight}}, transparent {{weight}}),
    linear-gradient(90deg, {{minor}} {{weight}}, transparent {{weight}}),
    linear-gradient({{major}} {{weight}}, transparent {{weight}}),
    linear-gradient(90deg, {{major}} {{weight}}, transparent {{weight}});
  background-size:
    {{size}} {{size}},
    {{size}} {{size}},
    calc({{size}} * 5) calc({{size}} * 5),
    calc({{size}} * 5) calc({{size}} * 5);
}`,
    },
  ],
});
