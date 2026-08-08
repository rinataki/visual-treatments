import type { Category } from "@/lib/treatment-schema";

// Canonical, ordered category list — the browse scope. Categories with no
// treatments yet still render (greyed, with a count of 0), so the filter bar
// doubles as a visible roadmap and an invitation to contribute.
export const CATEGORIES: { key: Category; label: string; blurb: string }[] = [
  { key: "texture", label: "Textures", blurb: "Paper, noise, grain, film" },
  { key: "material", label: "Materials", blurb: "Glass, metal, paper stock, ceramic" },
  { key: "pattern", label: "Patterns", blurb: "Grid, dots, checkerboard" },
  { key: "lighting", label: "Lighting", blurb: "Glow, backlight, shadow" },
  { key: "typography", label: "Typography", blurb: "Marker, outline" },
  { key: "motion", label: "Motion", blurb: "Animated grain, floating noise" },
];
