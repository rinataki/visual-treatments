import type { Category } from "@/lib/treatment-schema";

// Canonical, ordered category list — the browse scope. Categories with no
// treatments yet still render (greyed, with a count of 0), so the filter bar
// doubles as a visible roadmap and an invitation to contribute.
// `color` drives the per-category app-style icon on gallery cards.
export const CATEGORIES: {
  key: Category;
  label: string;
  blurb: string;
  color: string;
}[] = [
  { key: "texture", label: "Textures", blurb: "Paper, noise, grain, film", color: "#b08968" },
  { key: "material", label: "Materials", blurb: "Glass, metal, paper stock, ceramic", color: "#64748b" },
  { key: "pattern", label: "Patterns", blurb: "Grid, dots, checkerboard", color: "#3b82f6" },
  { key: "lighting", label: "Lighting", blurb: "Glow, backlight, shadow", color: "#f59e0b" },
  { key: "typography", label: "Typography", blurb: "Marker, outline", color: "#8b5cf6" },
  { key: "motion", label: "Motion", blurb: "Animated grain, floating noise", color: "#ec4899" },
];

export const categoryColor = (key: Category): string =>
  CATEGORIES.find((c) => c.key === key)?.color ?? "#6b7280";
