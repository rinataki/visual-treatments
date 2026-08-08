import { defineTreatment } from "@/lib/treatment-schema";

// 1-bit ordered (Bayer) dither shipped as a tiny SVG tile through CSS. This is
// the content-independent form — a fixed 4×4 Bayer arrangement tiled as a
// texture. Applying dither to a real photo (error diffusion) needs a canvas.
// Kept two-tone (bg + black) so no hex lands inside the data-URI string.
export const orderedDither = defineTreatment({
  name: "Ordered Dither",
  slug: "ordered-dither",
  category: "pattern",
  subcategory: "dither",
  description: "A crisp 1-bit Bayer stipple — the retro, low-fi print look.",
  feelings: ["experimental", "minimal"],
  previewBackground: "#f4f1ea",

  controls: [
    { type: "range", key: "scale", label: "Scale", default: 8, min: 4, max: 32, unit: "px" },
    { type: "color", key: "bg", label: "Paper", default: "#f4f1ea" },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      note: "A 4×4 Bayer tile, scaled with pixelated rendering.",
      code: `.ordered-dither {
  background-color: {{bg}};
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='4' height='4' shape-rendering='crispEdges'><g fill='black'><rect x='0' y='0' width='1' height='1'/><rect x='2' y='0' width='1' height='1'/><rect x='1' y='1' width='1' height='1'/><rect x='0' y='2' width='1' height='1'/><rect x='2' y='2' width='1' height='1'/><rect x='3' y='3' width='1' height='1'/></g></svg>");
  background-size: {{scale}} {{scale}};
  image-rendering: pixelated;
}`,
    },
  ],
});
