"use client";

import { getReadableTextColor } from "../core/colorUtils";
import { getHueFamily } from "../core/colorUtils";




interface ColorCardProps {
  name: string;
  hex: string;
  size?: "sm" | "md" | "lg";
  showHue?: boolean;
}

export default function ColorCard({
  name,
  hex,
  size = "md",
  showHue = true
}: ColorCardProps)


{
  const sizeClasses =
    size === "lg"
      ? "w-64 h-64 text-lg"
      : size === "sm"
      ? "w-32 h-32 text-xs"
      : "w-40 h-40 text-sm";

  return (
    <div
      onClick={() => navigator.clipboard.writeText(hex)}
      className={`${sizeClasses} rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition flex flex-col items-center justify-center font-semibold`}
      style={{
        background: hex,
        color: getReadableTextColor(hex),
        textShadow: "0 1px 2px rgba(0,0,0,0.4)"
      }}
    >
    <span>{name}</span>

{showHue && (
  <span className="opacity-80 text-[11px]">
    Hue: {getHueFamily(hex)}
  </span>
)}

<span className="opacity-70 text-[10px]">{hex}</span>

    </div>
  );
}
