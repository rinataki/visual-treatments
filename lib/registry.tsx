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
import { outline } from "@/treatments/outline/metadata";
import { Demo as OutlineDemo } from "@/treatments/outline/demo";
import { marker } from "@/treatments/marker/metadata";
import { Demo as MarkerDemo } from "@/treatments/marker/demo";
import { gradientText } from "@/treatments/gradient-text/metadata";
import { Demo as GradientTextDemo } from "@/treatments/gradient-text/demo";
import { sticker } from "@/treatments/sticker/metadata";
import { Demo as StickerDemo } from "@/treatments/sticker/demo";
import { washiTape } from "@/treatments/washi-tape/metadata";
import { Demo as WashiTapeDemo } from "@/treatments/washi-tape/demo";
import { rubberStamp } from "@/treatments/rubber-stamp/metadata";
import { Demo as RubberStampDemo } from "@/treatments/rubber-stamp/demo";
import { cornerFold } from "@/treatments/corner-fold/metadata";
import { Demo as CornerFoldDemo } from "@/treatments/corner-fold/demo";
import { frostedGlass } from "@/treatments/frosted-glass/metadata";
import { Demo as FrostedGlassDemo } from "@/treatments/frosted-glass/demo";
import { brushedMetal } from "@/treatments/brushed-metal/metadata";
import { Demo as BrushedMetalDemo } from "@/treatments/brushed-metal/demo";
import { spotlight } from "@/treatments/spotlight/metadata";
import { Demo as SpotlightDemo } from "@/treatments/spotlight/demo";
import { neonGlow } from "@/treatments/neon-glow/metadata";
import { Demo as NeonGlowDemo } from "@/treatments/neon-glow/demo";
import { animatedGrain } from "@/treatments/animated-grain/metadata";
import { Demo as AnimatedGrainDemo } from "@/treatments/animated-grain/demo";
import { shimmer } from "@/treatments/shimmer/metadata";
import { Demo as ShimmerDemo } from "@/treatments/shimmer/demo";

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
  outline: { meta: outline, Demo: OutlineDemo },
  marker: { meta: marker, Demo: MarkerDemo },
  "gradient-text": { meta: gradientText, Demo: GradientTextDemo },
  sticker: { meta: sticker, Demo: StickerDemo },
  "washi-tape": { meta: washiTape, Demo: WashiTapeDemo },
  "rubber-stamp": { meta: rubberStamp, Demo: RubberStampDemo },
  "corner-fold": { meta: cornerFold, Demo: CornerFoldDemo },
  "frosted-glass": { meta: frostedGlass, Demo: FrostedGlassDemo },
  "brushed-metal": { meta: brushedMetal, Demo: BrushedMetalDemo },
  spotlight: { meta: spotlight, Demo: SpotlightDemo },
  "neon-glow": { meta: neonGlow, Demo: NeonGlowDemo },
  "animated-grain": { meta: animatedGrain, Demo: AnimatedGrainDemo },
  shimmer: { meta: shimmer, Demo: ShimmerDemo },
};

export const allTreatments = Object.values(registry).map((e) => e.meta);

// Default param values for a treatment, from each control's `default`.
export function defaultParams(meta: Treatment): ParamValues {
  const params: ParamValues = {};
  for (const c of meta.controls) params[c.key] = c.default;
  return params;
}

// Params for a static preview (gallery card): defaults plus the sample word for
// text treatments, under the reserved `__text` key the demos read.
export function previewParams(meta: Treatment): ParamValues {
  const params = defaultParams(meta);
  if (meta.surface === "text") params.__text = meta.sampleText ?? "Aa";
  return params;
}
