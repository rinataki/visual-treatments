import { defineTreatment } from "@/lib/treatment-schema";

// A die-cut vinyl sticker: colored face, thick white cut border, a tilt, and a
// soft lift shadow. `surface: "text"` makes the preview's sample-text field the
// sticker's label — so the playground doubles as a sticker generator: type the
// word, tune the shape, copy the CSS.
//
// Every control is authored so its raw value is a valid CSS literal, which lets
// pure {{token}} substitution keep the copied code in lockstep with the canvas.
// `lift` is multiplied inside calc() rather than exposed as three shadow
// sliders, so one control moves the whole shadow coherently.

export const sticker = defineTreatment({
  name: "Sticker",
  slug: "sticker",
  category: "embellishment",
  subcategory: "die-cut",
  description:
    "A die-cut vinyl sticker — white cut border, tilt, and a soft lift off the page.",
  feelings: ["playful", "tactile"],
  previewBackground: "#eef1f5",
  surface: "text",
  sampleText: "New!",

  controls: [
    { type: "color", key: "fill", label: "Face", default: "#ff4d6d" },
    { type: "color", key: "ink", label: "Label", default: "#ffffff" },
    { type: "color", key: "cut", label: "Cut border", default: "#ffffff" },
    { type: "range", key: "ring", label: "Cut width", default: 8, min: 0, max: 20, unit: "px", help: "The white vinyl margin left around the artwork." },
    { type: "range", key: "radius", label: "Corner radius", default: 16, min: 0, max: 80, unit: "px", help: "Push past ~60px for a pill or a badge." },
    { type: "range", key: "tilt", label: "Tilt", default: -6, min: -30, max: 30, unit: "deg" },
    { type: "range", key: "lift", label: "Lift", default: 6, min: 0, max: 24, unit: "px", help: "Drives the whole drop shadow from one value." },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      note: "One class on any inline element. The best default.",
      code: `.sticker {
  display: inline-block;
  padding: 0.45em 0.9em;
  font-weight: 800;
  line-height: 1.1;
  color: {{ink}};
  background: {{fill}};
  border: {{ring}} solid {{cut}};
  border-radius: {{radius}};
  transform: rotate({{tilt}});
  box-shadow: 0 {{lift}} calc({{lift}} * 1.8) rgba(15, 23, 42, 0.22);
}`,
    },
    {
      kind: "react",
      label: "React",
      language: "tsx",
      note: "Reach for this when the sticker is a reusable component with props.",
      code: `export function Sticker({
  children,
  fill = "{{fill}}",
  tilt = {{tilt}},
}: {
  children: React.ReactNode;
  fill?: string;
  tilt?: number;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.45em 0.9em",
        fontWeight: 800,
        lineHeight: 1.1,
        color: "{{ink}}",
        background: fill,
        border: "{{ring}} solid {{cut}}",
        borderRadius: "{{radius}}",
        transform: \`rotate(\${tilt}deg)\`,
        boxShadow: "0 {{lift}} calc({{lift}} * 1.8) rgba(15, 23, 42, 0.22)",
      }}
    >
      {children}
    </span>
  );
}`,
    },
  ],
});
