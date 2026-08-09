import { defineTreatment } from "@/lib/treatment-schema";

// Highlighter marker behind text — a gradient background, no image.
export const marker = defineTreatment({
  name: "Marker",
  slug: "marker",
  category: "typography",
  subcategory: "marker",
  description: "A hand-drawn highlighter swipe behind your words.",
  feelings: ["playful", "editorial"],
  previewBackground: "#ffffff",
  surface: "text",
  sampleText: "Marker",

  controls: [
    { type: "range", key: "start", label: "Baseline", default: 55, min: 20, max: 90, unit: "%", help: "Where the highlight band begins from the top." },
    { type: "color", key: "color", label: "Highlight", default: "#ffe066" },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      note: "Wrap inline text; the highlight sits behind the glyphs.",
      code: `.marker {
  background-image: linear-gradient(180deg, transparent {{start}}, {{color}} {{start}});
  padding: 0 0.15em;
}`,
    },
  ],
});
