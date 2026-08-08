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

That's it — the gallery card, treatment page, controls, and copy buttons are
all generated from the metadata.

## Stack

Next.js · React · TypeScript · Tailwind · Vercel
