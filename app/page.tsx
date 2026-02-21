"use client";
import { ColorData } from "../core/types";
import { useState } from "react";
import { colorDictionary } from "../core/colorDictionary";
import { generateShades, generateComplementary, generateAccent } from "../core/colorUtils";
import { objectColorMap } from "../core/objectColorMap";
import { findClosestColor, findColorByKeyword } from "../core/colorDataset";
import { generateMoodFromHex } from "../core/moodEngine";
import { generateUsageRatio } from "../core/usageEngine";
import { getReadableTextColor } from "../core/colorUtils";
import ColorCard from "../components/ColorCard";
import { generateBrandPalette } from "../core/paletteEngine";
import { convertToGrayscale } from "../core/colorUtils";
import { findColorSuggestions } from "../core/colorDataset";
import CreativePanel from "../components/CreativePanel";








export default function Home() {
  const [input, setInput] = useState("");
  const [color, setColor] = useState<ColorData | null>(null);
  const [mode, setMode] = useState<"technical" | "creative">("technical");
  const [suggestions, setSuggestions] = useState<ColorData[]>([]);

  


  const handleChange = (value: string) => {
    setInput(value);

    const lowerValue = value.toLowerCase().trim();

  const suggestionResults = findColorSuggestions(lowerValue);
setSuggestions(suggestionResults);


    // Se inizia con # lo usiamo direttamente
    if (lowerValue.startsWith("#")) {
  const matched = findClosestColor(lowerValue);

  setColor({
    name: matched.name,
    hex: lowerValue
  });

  return;
}


    // Se esiste nel dizionario
    if (colorDictionary[lowerValue]) {
      setColor(colorDictionary[lowerValue]);

      return;
    }

    // Se esiste nella objectColorMap
if (objectColorMap[lowerValue]) {
  const hex = objectColorMap[lowerValue];

  setColor({
    name: findClosestColor(hex).name,
    hex: hex
  });

  return;
}
// Fallback: cerca nel dataset per keyword
const keywordMatch = findColorByKeyword(lowerValue);

if (keywordMatch) {
  setColor(keywordMatch);
  return;
}

    // Altrimenti non mostriamo nulla
    setColor(null);

  };

  const shades = color
  ? generateShades(color.hex, color.name)
  : null;


const complementary = color
  ? generateComplementary(color.hex)
  : null;



const complementaryShades = complementary
  ? generateShades(complementary.hex, complementary.name)
  : null;

  const accent = color
  ? generateAccent(color.hex)
  : null;

  const moodProfile = color && mode === "creative"
  ? generateMoodFromHex(color.hex)
  : null;

  const usageRatio =
  color && mode === "creative"
    ? generateUsageRatio(color.hex)
    : null;




  return (
    <main className="min-h-screen bg-neutral-100 flex flex-col items-center justify-center gap-10 p-10">

      <h1 className="text-3xl font-bold">Color-Bind</h1>

      <div className="flex gap-4">
  <button
    onClick={() => setMode("technical")}
    className={`px-4 py-2 rounded-full ${
      mode === "technical" ? "bg-black text-white" : "bg-white"
    }`}
  >
    Technical
  </button>

  <button
    onClick={() => setMode("creative")}
    className={`px-4 py-2 rounded-full ${
      mode === "creative" ? "bg-black text-white" : "bg-white"
    }`}
  >
    Creative
  </button>
</div>


      <input
        type="text"
        placeholder="Enter HEX or color name (red, sky, forest...)"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full max-w-xl px-6 py-4 rounded-full shadow-md outline-none text-center text-lg"
      />


{suggestions.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-4 max-w-xl justify-center">
    {suggestions.map((color) => (
      <button
        key={color.hex}
        onClick={() => {
          setColor(color);
          setSuggestions([]);
        }}
     className="px-3 py-1 rounded-full text-xs border border-neutral-300 hover:scale-105 transition"
style={{
  background: color.hex,
  color: getReadableTextColor(color.hex)
}}
      >
        {color.name}
      </button>
    ))}
  </div>
)}

{color && (
  <ColorCard
    name={color.name}
    hex={color.hex}
    size="lg"
  />
)}


{shades && (
  <div className="flex gap-6">
    {shades.map((shade) => (
      <ColorCard
        key={shade.hex}
        name={shade.name}
        hex={shade.hex}
        size="sm"
      />
    ))}
  </div>
)}


{complementaryShades && (
  <div className="flex flex-col items-center gap-6 mt-10">
    <h2 className="text-lg font-semibold">Complementary</h2>

   <div className="flex gap-6">
  {complementaryShades.map((shade) => (
    <ColorCard
      key={shade.hex}
      name={shade.name}
      hex={shade.hex}
      size="sm"
    />
  ))}
</div>

  </div>
)}

{accent && (
  <div className="flex flex-col items-center gap-6 mt-10">
    <h2 className="text-lg font-semibold">Accent</h2>

    <ColorCard
  name={accent.name}
  hex={accent.hex}
  size="md"
/>
  </div>
)}


{moodProfile && (
  <div className="mt-10 max-w-xl text-center">
    <h2 className="text-xl font-semibold mb-4">
      Brand Interpretation
    </h2>

    <div className="mb-4">
      <strong>Mood:</strong> {moodProfile.mood.join(" / ")}
    </div>

    <div className="mb-4">
      <strong>Personality:</strong> {moodProfile.personality.join(" / ")}
    </div>

    <div>
      <strong>Best for:</strong> {moodProfile.industries.join(" / ")}
    </div>
    {usageRatio && (
  <div className="mt-6">
    <h3 className="font-semibold mb-4">Suggested Usage</h3>

    <div className="flex h-10 rounded-full overflow-hidden shadow-md text-[10px] font-semibold">

  <div
    className="flex items-center justify-center"
    style={{
      width: `${usageRatio.main}%`,
      background: color?.hex,
      color: getReadableTextColor(color!.hex),
      textShadow: "0 1px 2px rgba(0,0,0,0.4)"
    }}
  >
    {color?.name}
  </div>

  <div
    className="flex items-center justify-center"
    style={{
      width: `${usageRatio.secondary}%`,
      background: complementary?.hex,
      color: complementary
        ? getReadableTextColor(complementary.hex)
        : "#000",
      textShadow: "0 1px 2px rgba(0,0,0,0.4)"
    }}
  >
    {complementary?.name}
  </div>

  <div
    className="flex items-center justify-center"
    style={{
      width: `${usageRatio.accent}%`,
      background: accent?.hex,
      color: accent
        ? getReadableTextColor(accent.hex)
        : "#000",
      textShadow: "0 1px 2px rgba(0,0,0,0.4)"
    }}
  >
    {accent?.name}
  </div>

</div>


    <div className="flex justify-between text-sm mt-2">
      <span>Main {usageRatio.main}%</span>
      <span>Secondary {usageRatio.secondary}%</span>
      <span>Accent {usageRatio.accent}%</span>
    </div>
  </div>
)}

  </div>
)}

{mode === "creative" && (
  <CreativePanel
    color={color}
  />
)}


    </main>
  );
}
