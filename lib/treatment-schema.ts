// ─────────────────────────────────────────────────────────────────────────────
// Treatment schema — the single source of truth for a visual treatment.
//
// Everything the site does (controls UI, live preview, code-copy, browse/filter,
// AI metadata) derives from this shape. Design it well and the rest is execution.
// ─────────────────────────────────────────────────────────────────────────────

export type Category =
  | "texture"
  | "material"
  | "pattern"
  | "lighting"
  | "typography"
  | "motion";

// Curated, closed vocabulary — these become browse filters, so keep it small.
export type Feeling =
  | "warm"
  | "editorial"
  | "technical"
  | "premium"
  | "playful"
  | "experimental"
  | "tactile"
  | "minimal";

export type ImplementationKind = "css" | "svg" | "react" | "canvas";

// ── Controls ────────────────────────────────────────────────────────────────
// A discriminated union so the UI renders the right widget and we get
// exhaustive type-checking. `key` doubles as the CSS custom-property name the
// live preview sets (as `--<key>`), which the static CSS references via var().

interface ControlBase<T> {
  key: string;      // e.g. "opacity" — param name + CSS var name (`--opacity`)
  label: string;
  default: T;
  help?: string;
}

export interface RangeControl extends ControlBase<number> {
  type: "range";
  min: number;
  max: number;
  step?: number;    // defaults to 1
  unit?: string;    // e.g. "px", "%", "deg" — appended in both UI and CSS var
}

export interface ColorControl extends ControlBase<string> {
  type: "color";
}

export interface SelectControl extends ControlBase<string> {
  type: "select";
  options: { value: string; label: string }[];
}

export interface ToggleControl extends ControlBase<boolean> {
  type: "toggle";
}

export type Control = RangeControl | ColorControl | SelectControl | ToggleControl;

// Live values of all controls, keyed by Control["key"].
export type ParamValues = Record<string, number | string | boolean>;

// ── Implementations ───────────────────────────────────────────────────────────
// `code` is a STATIC snippet. Tunable params are expressed as CSS custom
// properties (var(--<key>)) so the copied code stays clean, parametric, and
// hand-tweakable. The live preview drives those same vars from the sliders.

export interface Implementation {
  kind: ImplementationKind;
  label: string;                    // e.g. "CSS", "SVG filter"
  language: "css" | "html" | "tsx" | "jsx" | "js";
  code: string;                     // static, copy-ready source
  recommended?: boolean;            // marks the canonical/default tab (usually CSS)
  note?: string;                    // one-liner: when to reach for this method
}

// ── Metadata ──────────────────────────────────────────────────────────────────
// Longer editorial prose (rationale, use-cases, perf, a11y) lives in notes.mdx.
// Anything that drives UI or filtering lives here as structured data.

export interface TreatmentMeta {
  name: string;
  slug: string;                     // url + folder name, kebab-case
  category: Category;
  subcategory?: string;
  description: string;              // one-sentence summary for cards + search
  feelings: Feeling[];
  controls: Control[];
  previewBackground?: string;
  // "background" (default) fills a surface; "text" styles a sample word. Text
  // treatments render editable sample text in the preview (passed to the demo
  // as params.__text) and their card shows the styled word instead of a fill.
  surface?: "background" | "text";
  sampleText?: string;              // default preview word for text treatments
}

export interface Treatment extends TreatmentMeta {
  implementations: Implementation[];
}

export function defineTreatment(t: Treatment): Treatment {
  return t;
}

// Substitute current param values into a static template. This is pure typed
// substitution — no arithmetic, no conditionals, no code generation. A `{{key}}`
// token is replaced by that control's value; range values get their unit
// appended (e.g. `24` → `24px`). Templates are authored so the raw substituted
// value is always a valid literal in the target language.
export function interpolate(
  template: string,
  controls: Control[],
  params: ParamValues,
): string {
  let out = template;
  for (const c of controls) {
    const raw = params[c.key] ?? c.default;
    const unit = c.type === "range" ? c.unit ?? "" : "";
    out = out.split(`{{${c.key}}}`).join(`${raw}${unit}`);
  }
  return out;
}
