import type { ProfileBundle } from "@/types/content";

export const profileBundleData: ProfileBundle = {
  siteTitle: "Mina's Seoul Edit",
  subtitle: "A local Korean's handpicked hidden gems for visiting friends.",
  introNote:
    "These are the Seoul spots I'd actually take you to — soulful food, quieter hanok corners, and hidden gems that rarely show up in tourist guides. Think of this as borrowing a local friend's personal map.",
  mapImageUrl: "/images/map/seoul-map-poster.png",
  curator: {
    name: "Mina",
    role: "Your local Seoul friend",
    shortBio:
      "Born and raised in Seoul. Years of collecting the places she'd actually bring friends to — not the obvious tourist picks, but the spots that make Seoul feel like Seoul.",
    heroImage: "/images/people/mina-portrait.jpg",
    heroImagePosition: "center center",
    accentColors: {
      primary: "#0F3D3E",
      secondary: "#C3F4D6",
    },
  },
};

export const profileTranslations: Record<string, Partial<Pick<ProfileBundle, "siteTitle" | "subtitle" | "introNote">> & { curator?: Partial<ProfileBundle["curator"]> }> = {
  es: {
    siteTitle: "Seúl según Mina",
    subtitle: "Joyas ocultas seleccionadas por una coreana local para amigos visitantes.",
    introNote:
      "Estos son los lugares de Seúl a los que realmente te llevaría: comida con alma, rincones hanok más tranquilos y joyas ocultas que rara vez aparecen en guías turísticas. Piensa en esto como tomar prestado el mapa personal de una amiga local.",
    curator: {
      role: "Tu amiga local en Seúl",
      shortBio:
        "Nacida y criada en Seúl. Años recopilando los lugares a los que realmente llevaría a sus amigos, no los típicos turísticos, sino los que hacen que Seúl se sienta como Seúl.",
    },
  },
  ja: {
    siteTitle: "Minaのソウルエディット",
    subtitle: "韓国人ローカルが友人のために厳選した隠れた名所。",
    introNote:
      "これは私が実際にあなたを連れて行くソウルのスポット。心のこもった食事、静かな韓屋の角、観光ガイドにはめったに載らない隠れた名所。地元の友達のパーソナルマップを借りるような体験を。",
    curator: {
      role: "あなたのソウル地元フレンド",
      shortBio:
        "ソウル生まれ、ソウル育ち。友達を実際に連れて行きたい場所を何年もかけて収集。観光客向けではなく、ソウルらしさを感じられるスポットを。",
    },
  },
  zh: {
    siteTitle: "Mina的首尔精选",
    subtitle: "韩国本地人为来访朋友精心挑选的隐藏宝藏。",
    introNote:
      "这些是我真正会带你去的首尔地方：有灵魂的美食、更安静的韩屋角落，以及很少出现在旅游指南中的隐藏宝藏。把这当作借用一位本地朋友的私人地图。",
    curator: {
      role: "你的首尔本地朋友",
      shortBio:
        "在首尔出生长大。多年来收集她真正会带朋友去的地方——不是明显的旅游景点，而是让首尔感觉像首尔的地方。",
    },
  },
};
