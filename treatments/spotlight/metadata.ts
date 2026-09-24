import { defineTreatment } from "@/lib/treatment-schema";

// A pool of light on a dark surface. The whole treatment is one radial-gradient
// — the craft is entirely in the falloff.
//
// A single hard stop reads as a flashlight cutout, so there are two: a bright
// core that holds its color, then a long fade to transparent. `falloff` moves
// the outer stop and `core` moves the inner one, which is the difference
// between a hard theatrical spot and a soft ambient wash.
//
// x/y carry "%" and size carries "px", so `circle 320px at 50% 38%` substitutes
// as a valid radial-gradient position.

export const spotlight = defineTreatment({
  name: "Spotlight",
  slug: "spotlight",
  category: "lighting",
  subcategory: "pool",
  description:
    "A single pool of light falling on a dark surface, with a tunable falloff.",
  feelings: ["premium", "minimal"],
  previewBackground: "#0a0a0f",

  controls: [
    { type: "color", key: "ambient", label: "Ambient", default: "#0a0a0f", help: "The unlit surface. Keep it dark — light needs somewhere to fall off to." },
    { type: "color", key: "light", label: "Light", default: "#fde68a" },
    { type: "range", key: "size", label: "Size", default: 320, min: 80, max: 700, unit: "px" },
    { type: "range", key: "x", label: "Position X", default: 50, min: 0, max: 100, unit: "%" },
    { type: "range", key: "y", label: "Position Y", default: 38, min: 0, max: 100, unit: "%" },
    { type: "range", key: "core", label: "Hot core", default: 12, min: 0, max: 60, unit: "%", help: "How far the light holds full intensity before it starts to fall off." },
    { type: "range", key: "falloff", label: "Falloff", default: 100, min: 40, max: 100, unit: "%", help: "Pull this in for a hard theatrical edge; leave it out for a soft wash." },
  ],

  implementations: [
    {
      kind: "css",
      label: "CSS",
      language: "css",
      recommended: true,
      note: "One gradient on the surface itself. The best default.",
      code: `.spotlight {
  background-color: {{ambient}};
  background-image: radial-gradient(
    circle {{size}} at {{x}} {{y}},
    {{light}} 0%,
    {{light}} {{core}},
    transparent {{falloff}}
  );
}`,
    },
    {
      kind: "react",
      label: "React",
      language: "tsx",
      note: "Reach for this to track the light to the cursor.",
      code: `"use client";

import { useState } from "react";

export function Spotlight({ children }: { children: React.ReactNode }) {
  const [pos, setPos] = useState({ x: {{x}}, y: {{y}} });

  return (
    <div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        });
      }}
      style={{
        backgroundColor: "{{ambient}}",
        backgroundImage: \`radial-gradient(circle {{size}} at \${pos.x}% \${pos.y}%, {{light}} 0%, {{light}} {{core}}, transparent {{falloff}})\`,
      }}
    >
      {children}
    </div>
  );
}`,
    },
  ],
});
