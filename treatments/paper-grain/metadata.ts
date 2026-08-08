import { defineTreatment } from "@/lib/treatment-schema";

// The honest hard case. The noise is an SVG `feTurbulence` filter, shipped
// *through CSS* as a data-URI background so it pastes into a stylesheet.
//
// Two controls are shaped so their raw value is a valid literal in the code,
// which lets pure {{token}} substitution reflect the full playground state —
// even the params buried in the data-URI string:
//   • "grain" is a range in feTurbulence baseFrequency space (higher = finer)
//   • "blend" is a select whose values ARE the CSS mix-blend-mode keywords
// CSS stays the recommended tab.

export const paperGrain = defineTreatment({
  name: "Paper Grain",
  slug: "paper-grain",
  category: "texture",
  subcategory: "grain",
  description:
    "A soft, tactile paper grain that warms up flat surfaces without looking noisy.",
  feelings: ["warm", "editorial", "tactile"],
  previewBackground: "#f4f1ea",

  controls: [
    { type: "range", key: "opacity", label: "Opacity", default: 0.4, min: 0, max: 1, step: 0.01 },
    { type: "range", key: "grain", label: "Grain size", default: 0.76, min: 0.4, max: 1, step: 0.01, help: "Higher = finer, denser grain." },
    { type: "color", key: "tint", label: "Tint", default: "#8a7f6a" },
    {
      type: "select",
      key: "blend",
      label: "Blend mode",
      default: "multiply",
      help: "Multiply reads like ink on paper; normal is a flat overlay.",
      options: [
        { value: "multiply", label: "Multiply" },
        { value: "normal", label: "Normal" },
      ],
    },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      note: "Zero JS, pastes into any stylesheet. The best default.",
      code: `.paper-grain {
  position: relative;
}
.paper-grain::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: {{opacity}};
  mix-blend-mode: {{blend}};
  background-color: {{tint}};
  background-blend-mode: multiply;
  /* baseFrequency controls grain size (higher = finer) */
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='{{grain}}' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}`,
    },
    {
      kind: "svg",
      label: "SVG filter",
      language: "html",
      note: "Reach for this to tune the raw feTurbulence directly.",
      code: `<svg width="100%" height="100%" style="opacity: {{opacity}}">
  <filter id="paper-grain">
    <feTurbulence type="fractalNoise" baseFrequency="{{grain}}" numOctaves="2" />
  </filter>
  <rect width="100%" height="100%" filter="url(#paper-grain)" />
</svg>`,
    },
    {
      kind: "react",
      label: "React",
      language: "tsx",
      note: "Drop-in overlay component; values below match the playground.",
      code: `export function PaperGrain({
  opacity = {{opacity}},
  tint = "{{tint}}",
}: {
  opacity?: number;
  tint?: string;
}) {
  const noise =
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'>" +
    "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='{{grain}}' numOctaves='2'/></filter>" +
    "<rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
        mixBlendMode: "{{blend}}",
        backgroundColor: tint,
        backgroundBlendMode: "multiply",
        backgroundImage: \`url("\${noise}")\`,
      }}
    />
  );
}`,
    },
  ],
});
