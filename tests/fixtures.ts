import type { ProfileBundle, RelatedSpot, Spot } from "@/types/content";

export const sampleProfile: ProfileBundle = {
  siteTitle: "Mina's Seoul Edit",
  subtitle: "Soft-land, wander well.",
  introNote: "A local Seoul recommendation board.",
  curator: {
    name: "Mina",
    role: "Curator",
    shortBio: "Mapped the mood.",
    heroImage: "/images/people/mina-portrait.svg",
  },
};

export const sampleSpot: Spot = {
  id: "sample-spot",
  type: "main",
  name: "Sample Spot",
  koreanName: "샘플 스팟",
  neighborhood: "Seongsu",
  district: "Seongdong",
  category: "Cafe Walk",
  subcategory: "Dessert cafe",
  vibeTags: ["airy", "quiet"],
  shortPitch: "A calm first stop.",
  description: "Longer editorial description for the sample spot.",
  localInsight: "Because it feels soft and personal.",
  bestTime: "Morning",
  priceLevel: "$$",
  googleMapsUrl: "https://maps.example.com/sample",
  priority: 1,
  seed: true,
  hiddenGem: false,
};

export const sampleRelatedSpot: RelatedSpot = {
  ...sampleSpot,
  id: "related-sample",
  name: "Related Sample",
  koreanName: "연관 샘플",
  seed: false,
  hiddenGem: true,
  type: "hidden_gem",
  reason: "Keeps the same energy going.",
};
