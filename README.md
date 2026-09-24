# Visual Treatments

An open-source library of production-ready interface aesthetics for design
engineers. Browse a gallery of visual treatments, tune them live, and copy
production-ready code — no install required.

Think shadcn/ui, but for visual language instead of UI components.

## How it works

Each treatment lives in its own folder under [`treatments/`](./treatments) and
is described by a single typed `metadata.ts` — the source of truth that drives
the controls UI, live preview, code snippets, and browse filters.

```
treatments/
  paper-grain/
    metadata.ts   # typed schema: name, category, feelings, controls, implementations
    demo.tsx      # live, interactive preview component
```

Implementation snippets are **static templates** with `{{token}}` placeholders.
The playground substitutes the current control values into the tokens, so the
code you copy matches what you see — without any code generation. See
[`lib/treatment-schema.ts`](./lib/treatment-schema.ts) for the schema and the
`interpolate()` engine.

Tuned settings live in the query string, so any state you can see you can send:
`?tilt=18&fill=%23ffbf00`. Only non-default values are written, and everything
read back is validated against the control that owns it — see
[`lib/share-state.ts`](./lib/share-state.ts).

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Add a treatment

1. Create `treatments/<slug>/metadata.ts` (export via `defineTreatment`).
2. Create `treatments/<slug>/demo.tsx` exporting a `Demo({ params })` component.
3. Register both in [`lib/registry.tsx`](./lib/registry.tsx).

That's it — the gallery card, treatment page, controls, search, and copy buttons
are all generated from the metadata.

Two conventions are worth keeping:

- **Author each token so its raw substituted value is a valid literal** in the
  target language. Ranges get their `unit` appended, so a `px` range lands as
  `24px`; a select's `value` should already be the CSS keyword. Derive related
  values with `calc()` in the template rather than adding a slider per layer.
- **Keep `demo.tsx` and the CSS snippet in lockstep.** The demo is the claim the
  snippet makes; if they drift, the copy button lies. `@keyframes` can't be
  expressed inline, so motion demos ship the rule in a `<style>` tag with a
  globally unique name.

## Stack

Next.js · React · TypeScript · Tailwind · Vercel
