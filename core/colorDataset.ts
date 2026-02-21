import { colornames } from "color-name-list";
import { ColorData } from "./types";

// Normalizziamo il dataset in formato coerente
export const bigColorDataset: ColorData[] = colornames.map((color) => ({
  name: color.name,
  hex: color.hex.toLowerCase()
}));
function hexToRgb(hex: string) {
  const cleanHex = hex.replace("#", "");
  const bigint = parseInt(cleanHex, 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

// Distanza semplice RGB
function colorDistance(hex1: string, hex2: string) {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);

  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  );
}

// Trova colore più vicino nel dataset
export function findClosestColor(hex: string): ColorData {
  let closest = bigColorDataset[0];
  let smallestDistance = Infinity;

  for (const color of bigColorDataset) {
    const distance = colorDistance(hex, color.hex);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closest = color;
    }
  }

  return closest;
}


export function findColorByKeyword(keyword: string) {
  const lowerKeyword = keyword.toLowerCase();

  // Troviamo il primo colore che contiene la parola nel nome
  const match = bigColorDataset.find((color) =>
    color.name.toLowerCase().includes(lowerKeyword)
  );

  return match || null;
}

export function findColorSuggestions(keyword: string, limit = 6) {
  const lowerKeyword = keyword.toLowerCase();

  if (lowerKeyword.length < 2) return [];

  return bigColorDataset
    .filter((color) =>
      color.name.toLowerCase().includes(lowerKeyword)
    )
    .slice(0, limit);
}