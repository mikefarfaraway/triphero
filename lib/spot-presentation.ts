import type { Spot } from "@/types/content";

const emojiRules: Array<{ match: RegExp; emoji: string }> = [
  { match: /kalguksu|noodle/i, emoji: "🍜" },
  { match: /abalone|porridge|guksu|soup|samgyetang|seolleongtang|gomtang|kongguksu/i, emoji: "🍲" },
  { match: /dumpling|mandu/i, emoji: "🥟" },
  { match: /bbq|samgyeopsal|bossam|jok bal|pig feet|pork/i, emoji: "🥩" },
  { match: /fried chicken|roasted chicken|chicken/i, emoji: "🍗" },
  { match: /dessert|bakery|croissant|hangwa|rice cake/i, emoji: "🍰" },
  { match: /tea/i, emoji: "🍵" },
  { match: /coffee|cafe/i, emoji: "☕" },
  { match: /cocktail|bar|speakeasy/i, emoji: "🍸" },
  { match: /pizza/i, emoji: "🍕" },
  { match: /sandwich/i, emoji: "🥪" },
  { match: /taco/i, emoji: "🌮" },
  { match: /fine dining|hanjeongsik|course/i, emoji: "🍽️" },
];

export function getSubcategoryEmoji(subcategory: string) {
  for (const rule of emojiRules) {
    if (rule.match.test(subcategory)) {
      return rule.emoji;
    }
  }

  return "📍";
}

export function getSubcategoryLabel(spot: Spot) {
  return `${getSubcategoryEmoji(spot.subcategory)} ${spot.subcategory}`;
}

export function getSpotPalette(spot: Spot) {
  const source = `${spot.category} ${spot.subcategory}`.toLowerCase();

  if (/cocktail|bar/.test(source)) {
    return {
      shell: "from-[#1B2030] via-[#28324C] to-[#4F375B]",
      accent: "bg-[#FEC89A]",
      text: "text-white",
    };
  }

  if (/bakery|dessert|tea|coffee|cafe/.test(source)) {
    return {
      shell: "from-[#FFF1DF] via-[#FFE2CE] to-[#F8CFAF]",
      accent: "bg-[#FF8F66]",
      text: "text-[#3A281F]",
    };
  }

  if (/bbq|jok bal|pork|bossam|chicken/.test(source)) {
    return {
      shell: "from-[#2B1F1B] via-[#6A3E2E] to-[#D27C58]",
      accent: "bg-[#FFD4BC]",
      text: "text-white",
    };
  }

  if (/fine dining|hanjeongsik|traditional/.test(source)) {
    return {
      shell: "from-[#F4E8D0] via-[#E6D0A8] to-[#C49B5F]",
      accent: "bg-[#1B3B36]",
      text: "text-[#221A11]",
    };
  }

  return {
    shell: "from-[#EAF7F0] via-[#D6EFE7] to-[#B7DED0]",
    accent: "bg-[#173D36]",
    text: "text-[#173029]",
  };
}
