import { defineTreatment } from "@/lib/treatment-schema";

// Halftone gradient: a uniform dot grid faded along an axis with a mask, so it
// reads like a print halftone ramping from solid to sparse. Pure CSS — the
// content-independent form of halftone (photo-driven dot sizing needs canvas).
export const halftone = defineTreatment({
  name: "Halftone",
  slug: "halftone",
  category: "pattern",
  subcategory: "halftone",
  description: "Print-style dot ramp that fades from solid to open across the surface.",
  feelings: ["premium", "editorial"],
  previewBackground: "#ffffff",

  controls: [
    { type: "range", key: "dotsize", label: "Dot size", default: 2, min: 0.5, max: 6, step: 0.5, unit: "px" },
    { type: "range", key: "gap", label: "Spacing", default: 8, min: 4, max: 24, unit: "px" },
    { type: "range", key: "angle", label: "Fade angle", default: 135, min: 0, max: 360, unit: "deg" },
    { type: "color", key: "dot", label: "Dot color", default: "#111318" },
    { type: "color", key: "bg", label: "Background", default: "#ffffff" },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      note: "Uniform dots faded with a mask — no JS.",
      code: `.halftone {
  background-color: {{bg}};
  background-image: radial-gradient({{dot}} {{dotsize}}, transparent {{dotsize}});
  background-size: {{gap}} {{gap}};
  -webkit-mask-image: linear-gradient({{angle}}, #000, transparent);
  mask-image: linear-gradient({{angle}}, #000, transparent);
}`,
    },
  ],
});
