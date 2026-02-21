"use client";

import ColorCard from "./ColorCard";
import { convertToGrayscale } from "../core/colorUtils";
import { BrandPalette } from "../core/paletteEngine";
import { ColorData } from "../core/types";
import { generateBrandPalette } from "../core/paletteEngine";
import { generateComplementary } from "../core/colorUtils";
import { generateAccent } from "../core/colorUtils";


interface CreativePanelProps {
  color: ColorData | null;
}

export default function CreativePanel({
  color
}: CreativePanelProps)

{
  if (!color) return null;
  // Secondary matematico (per ora)
const complementary = generateComplementary(color.hex);

// Accent creativo
const accent = generateAccent(color.hex);

// Brand palette generata qui dentro
const brandPalette = generateBrandPalette(
  color,
  complementary,
  accent
);




  return (
    <div className="mt-16 flex flex-col items-center gap-16">

      {/* Brand Palette */}
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-2xl font-semibold">Brand Palette</h2>

        <div className="flex flex-wrap gap-10 justify-center">

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium opacity-70">Main</span>
            <ColorCard
              name={brandPalette.main.name}
              hex={brandPalette.main.hex}
              size="md"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium opacity-70">Secondary</span>
            <ColorCard
              name={brandPalette.secondary.name}
              hex={brandPalette.secondary.hex}
              size="md"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium opacity-70">Accent</span>
            <ColorCard
              name={brandPalette.accent.name}
              hex={brandPalette.accent.hex}
              size="md"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium opacity-70">Neutral</span>
            <ColorCard
              name={brandPalette.neutral.name}
              hex={brandPalette.neutral.hex}
              size="md"
            />
          </div>

        </div>
      </div>

      {/* Grayscale Preview */}
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-2xl font-semibold">Grayscale Preview</h2>

        <div className="flex flex-wrap gap-10 justify-center">

          <ColorCard
            name={brandPalette.main.name}
            hex={convertToGrayscale(brandPalette.main.hex)}
            size="md"
            showHue={false}
          />

          <ColorCard
            name={brandPalette.secondary.name}
            hex={convertToGrayscale(brandPalette.secondary.hex)}
            size="md"
            showHue={false}
          />

          <ColorCard
            name={brandPalette.accent.name}
            hex={convertToGrayscale(brandPalette.accent.hex)}
            size="md"
            showHue={false}
          />

          <ColorCard
            name={brandPalette.neutral.name}
            hex={convertToGrayscale(brandPalette.neutral.hex)}
            size="md"
            showHue={false}
          />

        </div>
      </div>

    </div>
  );
}