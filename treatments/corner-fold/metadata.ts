import { defineTreatment } from "@/lib/treatment-schema";

// The turned-down corner of a page. Two layers, no images:
//   • a clip-path on the card notches the bottom-right corner away, so whatever
//     is behind shows through the missing triangle — the fold is real, not
//     painted on;
//   • a ::after triangle is that same corner flipped back over the crease. It
//     lands *inside* the surviving page area, so the parent's clip leaves it
//     alone.
//
// The shadow is a `filter: drop-shadow`, not a box-shadow — box-shadow is drawn
// on the border box and would be clipped away with the notch, while drop-shadow
// follows the clipped silhouette.
//
// `size` appears in both layers; because substitution is textual, one slider
// keeps the notch and the flap in perfect register.

export const cornerFold = defineTreatment({
  name: "Corner Fold",
  slug: "corner-fold",
  category: "embellishment",
  subcategory: "paper",
  description:
    "A dog-eared page corner — the card is notched away and the flap folded back over it.",
  feelings: ["editorial", "tactile", "minimal"],
  previewBackground: "#e9e4d9",

  controls: [
    { type: "color", key: "face", label: "Page", default: "#ffffff" },
    { type: "color", key: "flap", label: "Flap", default: "#d8d2c4", help: "The back of the sheet — usually a touch darker than the page." },
    { type: "range", key: "size", label: "Fold size", default: 56, min: 16, max: 120, unit: "px" },
    { type: "range", key: "shade", label: "Crease shadow", default: 0.22, min: 0, max: 0.5, step: 0.01 },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      note: "Pure CSS, one element plus a pseudo. Works over any background.",
      code: `.corner-fold {
  position: relative;
  background: {{face}};

  /* Notch the bottom-right corner clean away. */
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - {{size}}),
    calc(100% - {{size}}) 100%,
    0 100%
  );
}

/* The corner, folded back over the crease. */
.corner-fold::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: {{size}};
  height: {{size}};
  background: {{flap}};
  /* Upper-left half of the box — the mirror of the notch. */
  clip-path: polygon(0 0, 100% 0, 0 100%);
  filter: drop-shadow(-2px -2px 4px rgba(15, 23, 42, {{shade}}));
}`,
    },
  ],
});
