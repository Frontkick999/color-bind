import { colorDictionary } from "./colorDictionary";
import { ColorData } from "./types";

export function findColorByHex(hex: string): ColorData | null {
  const entries = Object.values(colorDictionary);

  const match = entries.find(
    (color) => color.hex.toLowerCase() === hex.toLowerCase()
  );

  return match || null;
}
