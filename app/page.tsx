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
import AnimatedBackground from "../components/AnimatedBackground";








export default function Home() {
  const [input, setInput] = useState("");
  const isTyping = input.trim().length > 0;
  const [color, setColor] = useState<ColorData | null>(null);
  const [mode, setMode] = useState<"technical" | "creative">("technical");
  const [suggestions, setSuggestions] = useState<ColorData[]>([]);

  


  const handleChange = (value: string) => {
    setInput(value);

    const lowerValue = value.toLowerCase().trim();
    // Se input vuoto → reset totale
if (lowerValue === "") {
  setColor(null);
  setSuggestions([]);
  return;
}

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
    <main className="relative min-h-screen flex flex-col items-center overflow-hidden px-6">
      
      {/* Animated background layer */}
    <div
  className={`absolute inset-0 transition-opacity duration-700 ${
    isTyping ? "opacity-0" : "opacity-100"
  }`}
>
  <AnimatedBackground />
</div>

{/* Gray background layer */}
<div
  className={`absolute inset-0 transition-all duration-800 ease-in-out ${
    isTyping ? "opacity-100" : "opacity-0"
  }`}
  style={{ background: "#F8F9FC" }}
/>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
  <svg width="900" height="900" className="opacity-10">
    <circle cx="450" cy="450" r="320" stroke="white" strokeWidth="1" fill="none"/>
    <circle cx="450" cy="450" r="220" stroke="white" strokeWidth="1" fill="none"/>
  </svg>
</div>

<div
  className={`
    relative z-10
    w-full max-w-5xl
    flex flex-col items-center
    transition-all duration-700 ease-in-out
    ${!isTyping ? "min-h-screen justify-center" : "pt-14 pb-24"}
  `}
>
 {!isTyping && (     
<h1
  className="
    text-6xl md:text-7xl
    font-semibold
    tracking-[-0.04em]
    mb-6
    transition-all duration-700 ease-in-out
  "
>
<span
  className={`
    transition-all duration-700
    bg-clip-text text-transparent
    ${isTyping
      ? "bg-gradient-to-b from-[#9FA3B4] to-[#EAECF5]"
      : "bg-gradient-to-b from-cyan-300 to-indigo-300 drop-shadow-[0_0_12px_rgba(99,102,241,0.25)]"}
  `}
>
  Color
</span>{" "}
<span
  className={`
    transition-all duration-700
    bg-clip-text text-transparent
    ${isTyping
      ? "bg-gradient-to-b from-[#9FA3B4] to-[#EAECF5]"
      : "bg-gradient-to-b from-indigo-300 to-cyan-300 drop-shadow-[0_0_12px_rgba(99,102,241,0.25)]"}
  `}
>
  
  Bind
</span>
</h1>
)}

<div
  className={`
    mb-12
    rounded-full
    p-[4px]
    backdrop-blur-xl
    transition-all duration-500 ease-in-out
    ${
      isTyping
        ? "bg-[#EEF0F7] border border-[#E6E8F0]"
        : "bg-[rgba(46,69,100,0.45)] border border-white/20 backdrop-blur-2xl"
    }
  `}
  style={{ width: "fit-content" }}
>
  <div className="flex gap-[4px]">
    <button
      onClick={() => setMode("technical")}
      className={`
        h-8
        rounded-full
        px-4
        flex items-center justify-center
        transition-all duration-300
        ${
          mode === "technical"
            ? isTyping
              ? "bg-white text-[#3B4156]"
              : "bg-[rgba(31,53,84,0.55)] text-[#F2F4F8] backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]"
            : isTyping
              ? "text-[#98A0B3]"
              : "text-[#B8C3D9]"
        }
      `}
    >
      <span className="text-[12px] font-semibold tracking-tight">
        Technical
      </span>
    </button>

    <button
      onClick={() => setMode("creative")}
      className={`
        h-8
        rounded-full
        px-4
        flex items-center justify-center gap-1.5
        transition-all duration-300
        ${
          mode === "creative"
            ? isTyping
              ? "bg-white text-[#3B4156]"
              : "bg-[#1F3554] text-[#F2F4F8] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]"
            : isTyping
              ? "text-[#98A0B3]"
              : "text-[#B8C3D9]"
        }
      `}
    >
      <span className="text-[12px] font-semibold tracking-tight">
        Creative
      </span>

      <span
        className={`
          text-[7px] font-semibold tracking-wide
          px-1.5 py-[1px] rounded-md
          border
          ${
            isTyping
              ? "bg-[#111827]/5 border-[#111827]/10 text-[#3B4156]"
              : "bg-transparent border-[#00C46A] text-[#00E07B]"
          }
        `}
      >
        PRO
      </span>
    </button>
  </div>
</div>



 <div
  className={`
    backdrop-blur-2xl
    rounded-[100px]
    shadow-[0_12px_18.1px_-2px_rgba(0,0,0,0.27)]
    px-8 py-5
    w-full max-w-xl
    mb-4
    transition-all duration-500 ease-in-out
    ${
      isTyping
        ? "border border-[#E6E8F0] bg-gradient-to-b from-white via-[#F6F7FB] to-[#EEF0F7]"
        : "border border-white/20 bg-white/10 hover:bg-white/15 focus-within:bg-white/15"
    }
  `}
>
  
  <input
    type="text"
    placeholder="Enter HEX or color name (red, sky, dragon...)"
    value={input}
    onChange={(e) => handleChange(e.target.value)}
    className={`
  bg-transparent
  outline-none
  w-full
  text-lg
  text-center
  transition-colors duration-500
  ${
    isTyping
      ? "text-[#5B6176] placeholder-[#A0A5B8]"
      : "text-white placeholder-white/60"
  }
`}
  />
</div>






{suggestions.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-4 max-w-xl justify-center">
    {suggestions.map((color) => (
      <button
        key={color.hex}
        onClick={() => {
          setColor(color);
          setSuggestions([]);
        }}
     className="px-3 py-1 rounded-full text-xs backdrop-blur-md border border-white/30 hover:scale-105 transition"
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
  <div className="mt-16">
    <ColorCard
      name={color.name}
      hex={color.hex}
      size="lg"
    />
  </div>
)}


{shades && (
  <div className="flex gap-6 mt-12">
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
    <h2 className="text-lg font-semibold text-[#3B4156]">
  Complementary
</h2>

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
    <h2 className="text-lg font-semibold text-[#3B4156]">
  Accent
</h2>

    <ColorCard
  name={accent.name}
  hex={accent.hex}
  size="md"
/>
  </div>
)}


{moodProfile && (
  <div className={`mt-10 max-w-xl text-center ${isTyping ? "text-[#667085]" : "text-white"}`}>
    <h2 className="text-lg font-semibold mb-4 text-[#3B4156]">
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
    <h2 className="text-lg font-semibold mb-4 text-[#3B4156]">
  Suggested Usage
</h2>

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

  </div>

    
</main>
  );
}
