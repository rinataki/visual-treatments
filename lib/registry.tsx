import type { Treatment, ParamValues } from "@/lib/treatment-schema";
import { paperGrain } from "@/treatments/paper-grain/metadata";
import { Demo as PaperGrainDemo } from "@/treatments/paper-grain/demo";
import { dotGrid } from "@/treatments/dot-grid/metadata";
import { Demo as DotGridDemo } from "@/treatments/dot-grid/demo";

export interface RegistryEntry {
  meta: Treatment;
  Demo: (props: { params: ParamValues }) => React.ReactNode;
}

export const registry: Record<string, RegistryEntry> = {
  "paper-grain": { meta: paperGrain, Demo: PaperGrainDemo },
  "dot-grid": { meta: dotGrid, Demo: DotGridDemo },
};

export const allTreatments = Object.values(registry).map((e) => e.meta);

// Default param values for a treatment, from each control's `default`.
export function defaultParams(meta: Treatment): ParamValues {
  const params: ParamValues = {};
  for (const c of meta.controls) params[c.key] = c.default;
  return params;
}
