import { defineTreatment } from "@/lib/treatment-schema";

// Anodised aluminium is two things stacked: a very fine directional grain, and
// one broad specular sweep across it. Either alone looks wrong — grain without
// the sweep is corduroy; the sweep without grain is a plastic gradient.
//
// The grain itself is *two* repeating gradients, not one. A single evenly
// spaced stripe reads as fabric — the eye locks onto the period instantly. The
// second layer runs at 2.7× the pitch, an irrational-enough ratio that the two
// only realign every ~27 lines, which is what gives real brushing its
// irregular, non-repeating scratch.
//
// All three gradients take {{angle}}, so one slider rotates the brushing, the
// scratches and the highlight together and they stay physically consistent.
//
// `sheen` and `grain` are raw 0–1 numbers so they drop straight into rgba(),
// including inside calc() for the derived layers.

export const brushedMetal = defineTreatment({
  name: "Brushed Metal",
  slug: "brushed-metal",
  category: "material",
  subcategory: "metal",
  description:
    "Anodised aluminium — a fine directional grain under one broad specular sweep.",
  feelings: ["premium", "technical", "minimal"],
  previewBackground: "#8e959d",

  controls: [
    { type: "color", key: "base", label: "Base metal", default: "#8e959d" },
    { type: "range", key: "angle", label: "Brush angle", default: 0, min: 0, max: 180, unit: "deg", help: "Rotates the grain, the scratches and the highlight together." },
    { type: "range", key: "pitch", label: "Grain pitch", default: 3, min: 2, max: 10, unit: "px", help: "Spacing of the fine grain. Keep it tight — 2–4px reads as metal." },
    { type: "range", key: "grain", label: "Grain contrast", default: 0.14, min: 0, max: 0.4, step: 0.01 },
    { type: "range", key: "sheen", label: "Sheen", default: 0.45, min: 0, max: 0.8, step: 0.01, help: "The broad specular sweep. This is what makes it look lit." },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      note: "Three gradients, no images, no JS. Tiles at any size.",
      code: `.brushed-metal {
  background-color: {{base}};
  background-image:
    /* broad specular sweep, across the grain */
    linear-gradient(
      calc({{angle}} + 90deg),
      rgba(255, 255, 255, {{sheen}}) 0%,
      rgba(255, 255, 255, 0) 26%,
      rgba(0, 0, 0, 0.22) 54%,
      rgba(255, 255, 255, 0) 76%,
      rgba(255, 255, 255, calc({{sheen}} * 0.6)) 100%
    ),
    /* coarse scratches — 2.7x the pitch, so the two grains never align */
    repeating-linear-gradient(
      {{angle}},
      rgba(255, 255, 255, {{grain}}) 0 1px,
      transparent 1px calc({{pitch}} * 2.7)
    ),
    /* fine grain */
    repeating-linear-gradient(
      {{angle}},
      rgba(255, 255, 255, calc({{grain}} * 0.55)) 0 1px,
      rgba(0, 0, 0, calc({{grain}} * 0.55)) 1px 2px,
      transparent 2px {{pitch}}
    );
}`,
    },
  ],
});
