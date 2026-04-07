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

export const profileTranslations: Record<string, Partial<Pick<ProfileBundle, "siteTitle" | "subtitle" | "introNote">> & { curator?: Partial<ProfileBundle["curator"]> }> = {
  es: {
    siteTitle: "Seúl según Mike",
    subtitle: "Los museos, parques y bares nocturnos favoritos de un nativo de Seúl para amigos visitantes.",
    introNote:
      "He vivido en Seúl más de 20 años y sigo descubriendo nuevos rincones. Estos son los lugares a los que realmente te llevaría: cafés de museo tranquilos, paseos por parques que se sienten como un reset, y bares que valen la pena para quedarse hasta tarde.",
    curator: {
      role: "Nativo de Seúl y product guy",
      shortBio:
        "Tech PM de día, explorador de bares de noche. Más de 20 años en Seúl, aún mapeando su versión favorita de la ciudad — museos, parques y bares de cócteles incluidos.",
    },
  },
  ja: {
    siteTitle: "Mikeのソウルエディット",
    subtitle: "ソウル生まれの友人が選ぶ、お気に入りの美術館、公園、深夜バー。",
    introNote:
      "ソウルに20年以上住んでいますが、まだ新しい発見があります。これは私が実際にあなたを連れて行くスポット：静かな美術館カフェ、リセットのような公園散歩、夜更かしする価値のあるバー。",
    curator: {
      role: "ソウル生まれのプロダクトガイ",
      shortBio:
        "昼はテックPM、夜はバー巡り。ソウル20年以上、まだ自分のお気に入りの街のバージョンを探索中——美術館、公園、カクテルバーも含めて。",
    },
  },
  zh: {
    siteTitle: "Mike的首尔精选",
    subtitle: "首尔本地人最爱的博物馆、公园和深夜酒吧，为来访朋友推荐。",
    introNote:
      "我在首尔生活了20多年，仍在发现新的角落。这些是我真正会带你去的地方：安静的博物馆咖啡馆、让人感觉焕然一新的公园散步，以及值得熬夜的酒吧。",
    curator: {
      role: "首尔本地人 & 产品经理",
      shortBio:
        "白天是科技产品经理，晚上是酒吧探索者。在首尔20多年，仍在绘制他最爱的城市版本——包括博物馆、公园和鸡尾酒吧。",
    },
  },
};
