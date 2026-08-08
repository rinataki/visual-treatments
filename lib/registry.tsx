import type { Treatment, ParamValues } from "@/lib/treatment-schema";
import { paperGrain } from "@/treatments/paper-grain/metadata";
import { Demo as PaperGrainDemo } from "@/treatments/paper-grain/demo";
import { dotGrid } from "@/treatments/dot-grid/metadata";
import { Demo as DotGridDemo } from "@/treatments/dot-grid/demo";
import { grid } from "@/treatments/grid/metadata";
import { Demo as GridDemo } from "@/treatments/grid/demo";
import { checkerboard } from "@/treatments/checkerboard/metadata";
import { Demo as CheckerboardDemo } from "@/treatments/checkerboard/demo";
import { diagonalStripes } from "@/treatments/diagonal-stripes/metadata";
import { Demo as DiagonalStripesDemo } from "@/treatments/diagonal-stripes/demo";
import { blueprint } from "@/treatments/blueprint/metadata";
import { Demo as BlueprintDemo } from "@/treatments/blueprint/demo";
import { crosshatch } from "@/treatments/crosshatch/metadata";
import { Demo as CrosshatchDemo } from "@/treatments/crosshatch/demo";
import { halftone } from "@/treatments/halftone/metadata";
import { Demo as HalftoneDemo } from "@/treatments/halftone/demo";
import { orderedDither } from "@/treatments/ordered-dither/metadata";
import { Demo as OrderedDitherDemo } from "@/treatments/ordered-dither/demo";

export interface RegistryEntry {
  meta: Treatment;
  Demo: (props: { params: ParamValues }) => React.ReactNode;
}

export const registry: Record<string, RegistryEntry> = {
  "paper-grain": { meta: paperGrain, Demo: PaperGrainDemo },
  "dot-grid": { meta: dotGrid, Demo: DotGridDemo },
  grid: { meta: grid, Demo: GridDemo },
  checkerboard: { meta: checkerboard, Demo: CheckerboardDemo },
  "diagonal-stripes": { meta: diagonalStripes, Demo: DiagonalStripesDemo },
  blueprint: { meta: blueprint, Demo: BlueprintDemo },
  crosshatch: { meta: crosshatch, Demo: CrosshatchDemo },
  halftone: { meta: halftone, Demo: HalftoneDemo },
  "ordered-dither": { meta: orderedDither, Demo: OrderedDitherDemo },
};

export const allTreatments = Object.values(registry).map((e) => e.meta);

// Default param values for a treatment, from each control's `default`.
export function defaultParams(meta: Treatment): ParamValues {
  const params: ParamValues = {};
  for (const c of meta.controls) params[c.key] = c.default;
  return params;
}
