import { hexToRgb, rgbToHsl } from "./colorUtils";

export interface MoodProfile {
  mood: string[];
  personality: string[];
  industries: string[];
}

export function generateMoodFromHex(hex: string): MoodProfile {
  const { r, g, b } = hexToRgb(hex);
  const { h } = rgbToHsl(r, g, b);

  // Warm Reds
  if (h >= 0 && h < 20) {
    return {
      mood: ["Passionate", "Bold", "Energetic"],
      personality: ["Confident", "Strong", "Attention-grabbing"],
      industries: ["Fashion", "Sports", "Food & Beverage"]
    };
  }

  // Orange
  if (h >= 20 && h < 50) {
    return {
      mood: ["Warm", "Friendly", "Playful"],
      personality: ["Approachable", "Creative", "Optimistic"],
      industries: ["Startups", "Education", "Kids brands"]
    };
  }

  // Yellow
  if (h >= 50 && h < 80) {
    return {
      mood: ["Optimistic", "Joyful", "Youthful"],
      personality: ["Cheerful", "Innovative", "Positive"],
      industries: ["Tech", "Marketing", "Entertainment"]
    };
  }

  // Green
  if (h >= 80 && h < 160) {
    return {
      mood: ["Natural", "Calm", "Balanced"],
      personality: ["Stable", "Organic", "Trustworthy"],
      industries: ["Wellness", "Sustainability", "Health"]
    };
  }

  // Blue
  if (h >= 160 && h < 220) {
    return {
      mood: ["Trust", "Professional", "Stable"],
      personality: ["Reliable", "Corporate", "Secure"],
      industries: ["Finance", "SaaS", "Corporate"]
    };
  }

  // Purple
  if (h >= 220 && h < 280) {
    return {
      mood: ["Creative", "Innovative", "Visionary"],
      personality: ["Artistic", "Tech-forward", "Imaginative"],
      industries: ["AI", "Design", "Creative Agencies"]
    };
  }

  // Pink
  if (h >= 280 && h < 330) {
    return {
      mood: ["Romantic", "Luxury", "Expressive"],
      personality: ["Elegant", "Bold", "Premium"],
      industries: ["Beauty", "Luxury", "Lifestyle"]
    };
  }

  // Default
  return {
    mood: ["Powerful", "Intense", "Dramatic"],
    personality: ["Strong", "Dominant", "High impact"],
    industries: ["Gaming", "Streetwear", "Entertainment"]
  };
}
