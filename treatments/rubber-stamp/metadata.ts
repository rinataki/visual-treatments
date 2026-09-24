import { defineTreatment } from "@/lib/treatment-schema";

// APPROVED. A rubber stamp is a border, uppercase tracking, a tilt — and,
// crucially, *broken ink*. The distress comes from an SVG feTurbulence used as
// a CSS mask: the filter writes fractal noise into the alpha channel, and
// feColorMatrix reshapes it into coverage.
//
// The gain of 4 on that alpha row is not decoration. Raw fractalNoise alpha
// clusters tightly around 0.5, so masking with it directly washes the ink out
// to a uniform 50% — a stamp that looks faded, not dry. Multiplying by 4 first
// blows the distribution past both ends of the 0–1 clamp, so most of the ink
// lands solid and the tails punch clean holes. `bite` then slides that
// distribution: the *offset* is the control, the gain is the enabler.
//
// `distress` is a range in feTurbulence baseFrequency space (higher = finer,
// more speckled), so the token substitutes straight into the data-URI.

export const rubberStamp = defineTreatment({
  name: "Rubber Stamp",
  slug: "rubber-stamp",
  category: "embellishment",
  subcategory: "stamp",
  description:
    "An inked rubber stamp with broken, dry-pad coverage and a careless tilt.",
  feelings: ["editorial", "tactile", "technical"],
  previewBackground: "#f7f4ec",
  surface: "text",
  sampleText: "Approved",

  controls: [
    { type: "color", key: "ink", label: "Ink", default: "#b91c1c" },
    { type: "range", key: "weight", label: "Border weight", default: 4, min: 1, max: 12, unit: "px" },
    { type: "range", key: "tilt", label: "Tilt", default: -9, min: -30, max: 30, unit: "deg" },
    { type: "range", key: "fade", label: "Ink density", default: 0.85, min: 0.3, max: 1, step: 0.01 },
    { type: "range", key: "distress", label: "Distress", default: 0.5, min: 0.2, max: 1.4, step: 0.01, help: "Higher = finer speckle. Lower = big dry patches." },
    { type: "range", key: "bite", label: "Bite", default: 1.2, min: 0.8, max: 2.8, step: 0.05, help: "How much ink the dry pad drops. Low = a clean, wet stamp; high = nearly out of ink." },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      note: "Zero JS — the distress rides in as a data-URI mask. The best default.",
      code: `.rubber-stamp {
  display: inline-block;
  padding: 0.3em 0.7em;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: {{ink}};
  border: {{weight}} solid {{ink}};
  border-radius: 6px;
  opacity: {{fade}};
  transform: rotate({{tilt}});

  /* Dry-pad coverage: fractal noise in the alpha channel, thresholded by the
     negative offset in the matrix, punches holes through the ink. */
  mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='s'><feTurbulence type='fractalNoise' baseFrequency='{{distress}}' numOctaves='3'/><feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 4 -{{bite}}'/></filter><rect width='100%25' height='100%25' filter='url(%23s)'/></svg>");
  -webkit-mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='s'><feTurbulence type='fractalNoise' baseFrequency='{{distress}}' numOctaves='3'/><feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 4 -{{bite}}'/></filter><rect width='100%25' height='100%25' filter='url(%23s)'/></svg>");
}`,
    },
    {
      kind: "react",
      label: "React",
      language: "tsx",
      note: "Reach for this to keep the long data-URI out of your stylesheet.",
      code: `export function RubberStamp({ children }: { children: React.ReactNode }) {
  const distress =
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'>" +
    "<filter id='s'><feTurbulence type='fractalNoise' baseFrequency='{{distress}}' numOctaves='3'/>" +
    "<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 4 -{{bite}}'/></filter>" +
    "<rect width='100%25' height='100%25' filter='url(%23s)'/></svg>";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.3em 0.7em",
        fontWeight: 800,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "{{ink}}",
        border: "{{weight}} solid {{ink}}",
        borderRadius: 6,
        opacity: {{fade}},
        transform: "rotate({{tilt}})",
        maskImage: \`url("\${distress}")\`,
        WebkitMaskImage: \`url("\${distress}")\`,
      }}
    >
      {children}
    </span>
  );
}`,
    },
  ],
});
