// ─────────────────────────────────────────────────────────────────────────────
// Shareable playground state.
//
// A tuned treatment is worth sending to someone. These two helpers round-trip
// the control values through the query string so the URL in the address bar is
// always exactly what the canvas is showing.
//
// Two rules keep the URLs usable and safe:
//
//   1. Only NON-DEFAULT values are written. A treatment left alone has a clean
//      URL, and a shared link names only what the sender actually changed — so
//      it stays readable, and it keeps working if a default is retuned later.
//
//   2. Everything read back is validated against the control that owns it.
//      These values land in style attributes, so a query string is untrusted
//      input: numbers must parse, selects must be one of their options, and
//      colors must be a literal hex triplet. Anything else falls back to the
//      default rather than reaching the DOM.
// ─────────────────────────────────────────────────────────────────────────────

import type { Control, ParamValues, Treatment } from "@/lib/treatment-schema";

const HEX = /^#[0-9a-fA-F]{6}$/;

export const TEXT_KEY = "text";

function coerce(c: Control, raw: string): number | string | boolean | null {
  switch (c.type) {
    case "range": {
      const n = Number(raw);
      if (!Number.isFinite(n)) return null;
      // Clamp rather than reject — an out-of-range number is a stale link, not
      // an attack, and the nearest legal value is the friendlier answer.
      return Math.min(c.max, Math.max(c.min, n));
    }
    case "toggle":
      return raw === "1" || raw === "true";
    case "select":
      return c.options.some((o) => o.value === raw) ? raw : null;
    case "color":
      return HEX.test(raw) ? raw : null;
  }
}

/** Read params out of a query string, falling back to defaults. */
export function paramsFromQuery(
  meta: Treatment,
  search: string,
  defaults: ParamValues,
): { params: ParamValues; sample: string | null } {
  const sp = new URLSearchParams(search);
  const params: ParamValues = { ...defaults };

  for (const c of meta.controls) {
    const raw = sp.get(c.key);
    if (raw === null) continue;
    const value = coerce(c, raw);
    if (value !== null) params[c.key] = value;
  }

  const sample = sp.get(TEXT_KEY);
  return { params, sample };
}

/** Serialize the params that differ from their defaults. */
export function queryFromParams(
  meta: Treatment,
  params: ParamValues,
  sample: string | null,
): string {
  const sp = new URLSearchParams();

  for (const c of meta.controls) {
    const value = params[c.key];
    if (value === undefined || value === c.default) continue;
    sp.set(c.key, c.type === "toggle" ? (value ? "1" : "0") : String(value));
  }

  if (sample !== null && sample !== (meta.sampleText ?? "")) {
    sp.set(TEXT_KEY, sample);
  }

  return sp.toString();
}
