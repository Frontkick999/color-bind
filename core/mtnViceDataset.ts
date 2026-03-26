import { ColorData } from "./types";

// DATABASE DEFINITIVO MTN VICE (50 Colori)
export const mtnViceColors: ColorData[] = [
  { name: "Amarillo Skinny / Skinny Yellow", hex: "#fff386" },
  { name: "Naranja Alive / Alive Orange", hex: "#fac294" },
  { name: "Sashimi / Sashimi", hex: "#ff958e" },
  { name: "Rosa Elefante / Elephant Pink", hex: "#ffa2ca" },
  { name: "Púrpura Kink / Kink Purple", hex: "#f6b8d0" },
  { name: "Violeta Lis / Lis Violet", hex: "#9993c3" },
  { name: "Amarillo Travis / Travis Yellow", hex: "#fff048" },
  { name: "Naranja Chaleco / Vest Orange", hex: "#e77a19" },
  { name: "Rojo Palanca / Palanca Red", hex: "#e74f45" },
  { name: "Rosa Tusi / Tusi Pink", hex: "#de336b" },
  { name: "Violeta Insomnio / Sleepless Violet", hex: "#c8739f" },
  { name: "Violeta Lealtad / Loyalty Violet", hex: "#6d63a5" },
  { name: "Amarillo Entrega / Delivery Yellow", hex: "#ffe100" },
  { name: "Naranja Tony / Tony Orange", hex: "#e95e0f" },
  { name: "Rojo Madrid / Madrid Red", hex: "#c52332" },
  { name: "Rosa Bougainville / Bougainville Pink", hex: "#dd1d5a" },
  { name: "Púrpura Drank / Drank Purple", hex: "#8f154b" },
  { name: "Violeta Úrsula / Ursula Violet", hex: "#45347a" },
  { name: "Amarillo Submarino / Submarine Yellow", hex: "#c8a10a" },
  { name: "Naranja Bután / Bhutan Orange", hex: "#b9501a" },
  { name: "Rojo Zorro / Fox Red", hex: "#82131d" },
  { name: "Rosa Paradise / Paradise Pink", hex: "#762a3d" },
  { name: "Púrpura Haze / Haze Purple", hex: "#582741" },
  { name: "Violeta Atmos / Atmos Violet", hex: "#2f2280" },
  { name: "Azul Pitufo / Smurf Blue", hex: "#97e6ff" },
  { name: "Verde Squirtle / Squirtle Green", hex: "#9fe5c2" },
  { name: "Verde Trinidad / Trinidad Green", hex: "#74b957" },
  { name: "Verde Tóxico / Toxic Green", hex: "#ced50a" },
  { name: "Marrón Piggy / Piggy Brown", hex: "#eecf99" },
  { name: "Gris Schredder / Schredder Grey", hex: "#e1e2e2" },
  { name: "Azul Durango / Durango Blue", hex: "#60c5e7" },
  { name: "Verde Saint-Denis / Saint-Denis Green", hex: "#8bc8aa" },
  { name: "Verde Tirador / Sniper Green", hex: "#88b14f" },
  { name: "Verde Costla / Costla Green", hex: "#b0c643" },
  { name: "Marrón Peluche / Teddy Brown", hex: "#cc9456" },
  { name: "Gris Alambrada / Wire Grey", hex: "#7b7c7e" },
  { name: "Azul Eléctrico / Electric Blue", hex: "#007fc4" },
  { name: "Verde Salida / Exit Green", hex: "#5bb89e" },
  { name: "Verde Sapo / Frog Green", hex: "#6a9720" },
  { name: "Verde Lagarto / Lizard Green", hex: "#60b565" },
  { name: "Marrón Wallaby / Wallaby Brown", hex: "#8a5531" },
  { name: "Gris Mariposa / Butterfly Grey", hex: "#616264" },
  { name: "Azul Snoop / Snoop Blue", hex: "#00659d" },
  { name: "Verde Mocoso / Snotty Green", hex: "#005231" },
  { name: "Verde Tasmania / Tasmania Green", hex: "#0f2405" },
  { name: "Verde Pulgar / Thumb Green", hex: "#006942" },
  { name: "Marrón Mercancía / Freight Brown", hex: "#402009" },
  { name: "Gris Búnquer / Bunker Grey", hex: "#464648" },
  { name: "Negro Vanta / Vanta Black", hex: "#000000" },
  { name: "Blanco Líneas / White Lines", hex: "#ffffff" },
];

// FUNZIONI DI RICERCA E CALAMITA PER VICE
function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16) || 0;
  const g = parseInt(h.substring(2, 4), 16) || 0;
  const b = parseInt(h.substring(4, 6), 16) || 0;
  return { r, g, b };
}

function findClosestInArray(hex: string, array: ColorData[]): ColorData {
  const targetRgb = hexToRgb(hex);
  let closestColor = array[0];
  let minDistance = Infinity;
  for (const color of array) {
    const rgb = hexToRgb(color.hex);
    const distance = Math.sqrt(Math.pow(targetRgb.r - rgb.r, 2) + Math.pow(targetRgb.g - rgb.g, 2) + Math.pow(targetRgb.b - rgb.b, 2));
    if (distance < minDistance) { minDistance = distance; closestColor = color; }
  }
  return closestColor;
}

export function findMtnViceSuggestions(query: string): ColorData[] {
  if (!query) return [];
  return mtnViceColors.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
}

export function findMtnViceByKeyword(keyword: string): ColorData | null {
  const lowerKeyword = keyword.toLowerCase();
  return mtnViceColors.find(c => c.name.toLowerCase() === lowerKeyword) || 
         mtnViceColors.find(c => c.name.toLowerCase().includes(lowerKeyword)) || null;
}

export function findClosestMtnViceColor(hex: string): ColorData {
  return findClosestInArray(hex, mtnViceColors);
}