import { defineTreatment } from "@/lib/treatment-schema";

// A strip of washi tape pinning something to the page. Three details do the
// work: the paper *fibres* (a 1px repeating gradient), the translucency
// (multiply, so whatever is underneath shows through), and soft-faded ends that
// read as torn rather than guillotined.
//
// `strength` is a raw 0–1 number so it drops straight into color-mix(), and
// `length`/`width` carry their own units — every token substitutes to a valid
// CSS literal.

export const washiTape = defineTreatment({
  name: "Washi Tape",
  slug: "washi-tape",
  category: "embellishment",
  subcategory: "tape",
  description:
    "A translucent strip of paper tape, fibres and torn ends included, taped across the surface.",
  feelings: ["playful", "tactile", "warm"],
  previewBackground: "#faf7f0",

  controls: [
    { type: "color", key: "color", label: "Tape color", default: "#f2b5a7" },
    { type: "range", key: "strength", label: "Opacity", default: 70, min: 20, max: 100, unit: "%", help: "Tape is translucent — leave room for what's underneath." },
    { type: "range", key: "length", label: "Length", default: 62, min: 20, max: 100, unit: "%" },
    { type: "range", key: "width", label: "Width", default: 44, min: 16, max: 90, unit: "px" },
    { type: "range", key: "tilt", label: "Tilt", default: -8, min: -45, max: 45, unit: "deg" },
    { type: "range", key: "fibre", label: "Fibre spacing", default: 4, min: 2, max: 12, unit: "px", help: "The fine vertical grain of the paper." },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      note: "Absolutely positioned inside any relative parent. Zero JS.",
      code: `.washi-tape {
  position: absolute;
  top: 50%;
  left: 50%;
  width: {{length}};
  height: {{width}};
  transform: translate(-50%, -50%) rotate({{tilt}});
  pointer-events: none;

  /* translucent paper stock */
  background-color: color-mix(in srgb, {{color}} {{strength}}, transparent);
  mix-blend-mode: multiply;

  /* fibres running along the strip */
  background-image: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.4) 0 1px,
    transparent 1px {{fibre}}
  );

  /* torn, feathered ends */
  mask-image: linear-gradient(
    90deg,
    transparent 0,
    #000 10px,
    #000 calc(100% - 10px),
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent 0,
    #000 10px,
    #000 calc(100% - 10px),
    transparent 100%
  );

  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.16);
}`,
    },
  ],
});
