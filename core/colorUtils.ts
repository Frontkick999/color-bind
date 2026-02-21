
import { findColorByHex } from "./colorLookup";
import { ColorData } from "./types";
import { findClosestColor } from "./colorDataset";


// HEX → RGB
export function hexToRgb(hex: string) {
  const cleanHex = hex.replace("#", "");
  const bigint = parseInt(cleanHex, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

// RGB → HEX
export function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// RGB → HSL
export function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100
  };
}

// HSL → RGB
export function hslToRgb(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  h /= 360;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

// Generate 3 shades
export function generateShades(hex: string, baseName: string): ColorData[] {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);

  const darkL = Math.max(l - 20, 5);
  const lightL = Math.min(l + 20, 95);

  const darkRgb = hslToRgb(h, s, darkL);
  const lightRgb = hslToRgb(h, s, lightL);

  const darkHex = rgbToHex(darkRgb.r, darkRgb.g, darkRgb.b);
  const lightHex = rgbToHex(lightRgb.r, lightRgb.g, lightRgb.b);

  const darkMatch = findColorByHex(darkHex);
  const lightMatch = findColorByHex(lightHex);

const darkColor = findClosestColor(darkHex);
const baseColor = findClosestColor(hex);
const lightColor = findClosestColor(lightHex);

return [darkColor, baseColor, lightColor];

}

// Generate complementary color
export function generateComplementary(hex: string): ColorData {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);

  const complementaryHue = (h + 180) % 360;

  const compRgb = hslToRgb(complementaryHue, s, l);
  const compHex = rgbToHex(compRgb.r, compRgb.g, compRgb.b);

  return findClosestColor(compHex);
}
export function generateAccent(hex: string): ColorData {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);

  // Hue triadica ma più controllata
  const accentHue = (h + 120) % 360;

  // Riduciamo saturazione per effetto pastello
  const accentS = Math.max(s - 20, 25);

  // Aumentiamo leggermente luminosità
  const accentL = Math.min(l + 10, 85);

  const accentRgb = hslToRgb(accentHue, accentS, accentL);
  const accentHex = rgbToHex(accentRgb.r, accentRgb.g, accentRgb.b);

  return findClosestColor(accentHex);
}
export function getReadableTextColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);

  // Calcolo luminanza percepita
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.6 ? "#000000" : "#ffffff";
}

export function convertToGrayscale(hex: string): string {
  const { r, g, b } = hexToRgb(hex);

  const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

  const grayHex = rgbToHex(gray, gray, gray);

  return grayHex;
}


export function getHueFamily(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const { h } = rgbToHsl(r, g, b);

  if (h >= 0 && h < 20) return "Red";
  if (h >= 20 && h < 45) return "Orange";
  if (h >= 45 && h < 70) return "Yellow";
  if (h >= 70 && h < 160) return "Green";
  if (h >= 160 && h < 210) return "Cyan";
  if (h >= 210 && h < 260) return "Blue";
  if (h >= 260 && h < 300) return "Purple";
  if (h >= 300 && h < 340) return "Pink";

  return "Red";
}





