import { hexToRgb, rgbToHsl } from "./colorUtils";

export interface UsageRatio {
  main: number;
  secondary: number;
  accent: number;
}

export function generateUsageRatio(hex: string): UsageRatio {
  const { r, g, b } = hexToRgb(hex);
  const { s, l } = rgbToHsl(r, g, b);

  let main = 70;
  let secondary = 20;
  let accent = 10;

  // Se colore molto saturo → meno dominante
  if (s > 70) {
    main = 60;
    secondary = 25;
    accent = 15;
  }

  // Se colore poco saturo → più dominante
  if (s < 40) {
    main = 75;
    secondary = 15;
    accent = 10;
  }

  // Se molto scuro → meno dominante
  if (l < 30) {
    main -= 5;
    secondary += 5;
  }

  // Se molto chiaro → più dominante
  if (l > 75) {
    main += 5;
    secondary -= 5;
  }

  // Normalizzazione di sicurezza
  const total = main + secondary + accent;

  return {
    main: Math.round((main / total) * 100),
    secondary: Math.round((secondary / total) * 100),
    accent: Math.round((accent / total) * 100)
  };
}
