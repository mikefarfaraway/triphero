import type { ProfileBundle } from "@/types/content";

export const profileBundleData: ProfileBundle = {
  siteTitle: "Mike's Seoul Edit",
  subtitle: "A Seoul native's favorite museums, parks, and late-night bars for visiting friends.",
  introNote:
    "I've lived in Seoul for over 20 years and I'm still discovering new corners. These are the spots I'd actually take you to — quiet museum cafes, park walks that feel like a reset, and bars worth staying out late for.",
  mapImageUrl: "/images/map/mike-map-poster.jpg",
  curator: {
    name: "Mike",
    role: "Seoul native & product guy",
    shortBio:
      "Tech PM by day, bar hopper by night. 20+ years in Seoul, still mapping out his favorite version of the city — museums, parks, and cocktail bars included.",
    heroImage: "/images/people/mike-portrait.jpg",
    heroImagePosition: "center 20%",
    accentColors: {
      primary: "#2D3A4A",
      secondary: "#D4E4F7",
    },
  },
};
