"use client";

import ColorCard from "./ColorCard";
import { convertToGrayscale } from "../core/colorUtils";
import { BrandPalette } from "../core/paletteEngine";
import { ColorData } from "../core/types";
import { generateBrandPalette } from "../core/paletteEngine";
import { generateComplementary } from "../core/colorUtils";
import { generateAccent } from "../core/colorUtils";

// IMPORTIAMO LE CALAMITE
import { findClosestMtn94Color } from "../core/mtn94Dataset";
import { findClosestMtnHardcoreColor } from "../core/mtnHardcoreDataset";
import { findClosestMtnViceColor } from "../core/mtnViceDataset";

interface CreativePanelProps {
  color: ColorData | null;
  mode: "technical" | "creative" | "mtn94" | "mtnHardcore" | "mtnVice"; // <-- Aggiunto mtnVice
}

export default function CreativePanel({
  color,
  mode
}: CreativePanelProps) {
  if (!color) return null;

  // Secondary matematico (per ora)
  const complementary = generateComplementary(color.hex);

  // Accent creativo
  const accent = generateAccent(color.hex);

  // Brand palette generata digitalmente
  let brandPalette = generateBrandPalette(
    color,
    complementary,
    accent
  );

  // LA MAGIA MTN 94
  if (mode === "mtn94") {
    brandPalette = {
      main: findClosestMtn94Color(brandPalette.main.hex),
      secondary: findClosestMtn94Color(brandPalette.secondary.hex),
      accent: findClosestMtn94Color(brandPalette.accent.hex),
      neutral: findClosestMtn94Color(brandPalette.neutral.hex),
    };
  }

  // LA MAGIA HARDCORE
  if (mode === "mtnHardcore") {
    brandPalette = {
      main: findClosestMtnHardcoreColor(brandPalette.main.hex),
      secondary: findClosestMtnHardcoreColor(brandPalette.secondary.hex),
      accent: findClosestMtnHardcoreColor(brandPalette.accent.hex),
      neutral: findClosestMtnHardcoreColor(brandPalette.neutral.hex),
    };
  }

  // LA MAGIA VICE (Nuova!)
  if (mode === "mtnVice") {
    brandPalette = {
      main: findClosestMtnViceColor(brandPalette.main.hex),
      secondary: findClosestMtnViceColor(brandPalette.secondary.hex),
      accent: findClosestMtnViceColor(brandPalette.accent.hex),
      neutral: findClosestMtnViceColor(brandPalette.neutral.hex),
    };
  }

  return (
    <div className="mt-16 flex flex-col items-center gap-16">

      {/* Brand Palette */}
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-lg font-semibold text-[#3B4156]">
          Brand Palette
        </h2>

        <div className="flex flex-wrap gap-10 justify-center">

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium opacity-70 text-[#667085]">Main</span>
            <ColorCard
              name={brandPalette.main.name}
              hex={brandPalette.main.hex}
              size="md"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium opacity-70 text-[#667085]">Secondary</span>
            <ColorCard
              name={brandPalette.secondary.name}
              hex={brandPalette.secondary.hex}
              size="md"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium opacity-70 text-[#667085]">Accent</span>
            <ColorCard
              name={brandPalette.accent.name}
              hex={brandPalette.accent.hex}
              size="md"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium opacity-70 text-[#667085]">Neutral</span>
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
        <h2 className="text-lg font-semibold text-[#3B4156]">Grayscale Preview</h2>

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