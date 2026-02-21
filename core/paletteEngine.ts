import { hexToRgb, rgbToHsl, hslToRgb, rgbToHex } from "./colorUtils";
import { findClosestColor } from "./colorDataset";
import { ColorData } from "./types";

export interface BrandPalette {
  main: ColorData;
  secondary: ColorData;
  accent: ColorData;
  neutral: ColorData;
}

export function generateBrandPalette(
  main: ColorData,
  secondary: ColorData,
  accent: ColorData
): BrandPalette {

  // Generiamo un neutral intelligente dal main
  const { r, g, b } = hexToRgb(main.hex);
  const { h, s, l } = rgbToHsl(r, g, b);

  // Neutral: stessa hue ma molto meno saturo e più chiaro
  const neutralS = Math.max(s * 0.15, 5);
  const neutralL = Math.min(l + 25, 92);

  const neutralRgb = hslToRgb(h, neutralS, neutralL);
  const neutralHex = rgbToHex(neutralRgb.r, neutralRgb.g, neutralRgb.b);

  const neutral = findClosestColor(neutralHex);

  return {
    main,
    secondary,
    accent,
    neutral
  };
}
