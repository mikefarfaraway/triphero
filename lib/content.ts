import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { profileBundleData as minaProfile, profileTranslations as minaTranslations } from "@/data/users/mina/profile";
import { profileBundleData as mikeProfile, profileTranslations as mikeTranslations } from "@/data/users/mike/profile";
import { VALID_USERNAMES, type Username } from "@/data/users/registry";
import type {
  HomepageData,
  ProfileBundle,
  RelatedSpot,
  Spot,
} from "@/types/content";

const accentSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
});

const personProfileSchema = z.object({
  name: z.string(),
  role: z.string(),
  shortBio: z.string(),
  heroImage: z.string(),
  heroImagePosition: z.string().optional(),
  heroImageScale: z.number().optional(),
  accentColors: accentSchema.optional(),
});

const profileBundleSchema = z.object({
  siteTitle: z.string(),
  subtitle: z.string(),
  introNote: z.string(),
  mapImageUrl: z.string().optional(),
  guest: personProfileSchema.optional(),
  curator: personProfileSchema,
});

const spotSchema = z.object({
  id: z.string(),
  type: z.enum(["main", "hidden_gem"]),
  name: z.string(),
  koreanName: z.string(),
  neighborhood: z.string(),
  district: z.string(),
  category: z.string(),
  subcategory: z.string(),
  vibeTags: z.array(z.string()).min(1),
  shortPitch: z.string(),
  description: z.string(),
  localInsight: z.string(),
  photoUrl: z.string().optional(),
  bestTime: z.string(),
  priceLevel: z.enum(["$", "$$", "$$$"]),
  googleMapsUrl: z.string().url(),
  naverMapUrl: z.string().url().optional(),
  priority: z.number().int(),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  seed: z.boolean(),
  hiddenGem: z.boolean(),
});

/* ── Per-user profiles ── */

const profiles: Record<Username, ProfileBundle> = {
  mina: profileBundleSchema.parse(minaProfile) as ProfileBundle,
  mike: profileBundleSchema.parse(mikeProfile) as ProfileBundle,
};

const translations: Record<Username, Record<string, Record<string, unknown>>> = {
  mina: minaTranslations,
  mike: mikeTranslations,
};

function getLocalizedProfile(username: Username, locale?: string): ProfileBundle {
  const base = profiles[username];
  if (!locale || locale === "en") return base;

  const t = translations[username]?.[locale];
  if (!t) return base;

  return {
    ...base,
    ...(t.siteTitle ? { siteTitle: t.siteTitle as string } : {}),
    ...(t.subtitle ? { subtitle: t.subtitle as string } : {}),
    ...(t.introNote ? { introNote: t.introNote as string } : {}),
    curator: {
      ...base.curator,
      ...((t.curator as Partial<ProfileBundle["curator"]>) ?? {}),
    },
  };
}

/* ── Per-user data cache ── */

type UserContent = {
  profile: ProfileBundle;
  spots: Spot[];
  spotMap: Map<string, Spot>;
};

const cache = new Map<string, UserContent>();

function getUserContent(username: string): UserContent {
  const cached = cache.get(username);
  if (cached) return cached;

  if (!VALID_USERNAMES.includes(username as Username)) {
    throw new Error(`Unknown user: ${username}`);
  }

  const profile = profiles[username as Username];
  const spots = z.array(spotSchema).parse(loadCsvSpots(username)) as Spot[];
  const spotMap = new Map(spots.map((spot) => [spot.id, spot]));

  const content: UserContent = { profile, spots, spotMap };
  cache.set(username, content);
  return content;
}

/* ── CSV parsing ── */

function parseCsv(content: string) {
  const normalized = content.replace(/^\uFEFF/, "").trim();
  const rows: string[][] = [];
  let cell = "";
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < normalized.length; i += 1) {
    const char = normalized[i];
    const next = normalized[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  const [header, ...body] = rows;
  return body.map((values) =>
    Object.fromEntries(header.map((key, index) => [key, values[index]?.trim() ?? ""])),
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replaceAll("&", " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

function inferPriceLevel(category: string, subcategory: string, type: Spot["type"]): Spot["priceLevel"] {
  const haystack = `${category} ${subcategory}`.toLowerCase();

  if (type === "hidden_gem" && /private|course|hanjeongsik/.test(haystack)) {
    return "$$$";
  }

  if (/bar|cocktail|fine dining|bbq|hotel/.test(haystack)) {
    return "$$$";
  }

  if (/cafe|bakery|coffee/.test(haystack)) {
    return "$$";
  }

  return "$$";
}

function inferBestTime(category: string, subcategory: string, neighborhood: string) {
  const haystack = `${category} ${subcategory}`.toLowerCase();
  const neighborhoodKey = neighborhood.toLowerCase();

  if (category === "Bar") {
    return "bestTime.afterDinner";
  }

  if (/cafe|bakery|coffee/.test(haystack)) {
    return "bestTime.lateMorningToSunset";
  }

  if (/porridge|soup|samgyetang/.test(haystack)) {
    return "bestTime.lunch";
  }

  if (/bbq|jok bal/.test(haystack)) {
    return "bestTime.dinner";
  }

  if (["bukchon", "anguk", "seochon", "buam-dong"].includes(neighborhoodKey)) {
    return "bestTime.lateAfternoon";
  }

  return "bestTime.lunchToDinner";
}

function inferVibeTags(row: Record<string, string>) {
  const source = `${row.category} ${row.subcategory} ${row.reason} ${row.neighborhood}`.toLowerCase();
  const tags = [
    `cat.${row.category}`,
    row.neighborhood,
    row.type === "hidden_gem" ? "tag.hidden gem" : "tag.local favorite",
  ];

  for (const extra of [
    "traditional",
    "hanok",
    "quiet",
    "romantic",
    "view",
    "mountain",
    "fine dining",
    "bakery",
    "bbq",
    "local",
    "classic",
    "rooftop",
    "cocktail",
  ]) {
    if (source.includes(extra) && !tags.includes(`tag.${extra}`)) {
      tags.push(`tag.${extra}`);
    }
  }

  return tags.slice(0, 5);
}

function loadCsvSpots(username: string): Spot[] {
  const filePath = path.join(process.cwd(), "data", "users", username, "spots.csv");
  const csv = fs.readFileSync(filePath, "utf-8");
  const rows = parseCsv(csv);

  return rows.map((row) => ({
    id: slugify(`${row.name_en}-${row.neighborhood}`),
    type: row.type as Spot["type"],
    name: row.name_en,
    koreanName: row.name_ko,
    neighborhood: row.neighborhood,
    district: row.district,
    category: row.category,
    subcategory: row.subcategory,
    vibeTags: inferVibeTags(row),
    shortPitch: row.reason,
    description: row.reason,
    localInsight: row.reason,
    photoUrl: resolveSpotPhotoUrl(slugify(`${row.name_en}-${row.neighborhood}`)),
    bestTime: inferBestTime(row.category, row.subcategory, row.neighborhood),
    priceLevel: inferPriceLevel(row.category, row.subcategory, row.type as Spot["type"]),
    googleMapsUrl: row.google_maps_url,
    naverMapUrl: row.naver_map_url || undefined,
    priority: Number(row.priority || 99),
    coordinates:
      row.lat && row.lng
        ? {
            lat: Number(row.lat),
            lng: Number(row.lng),
          }
        : undefined,
    seed: row.type === "main",
    hiddenGem: row.type === "hidden_gem",
  }));
}

function resolveSpotPhotoUrl(id: string) {
  const extensions = ["jpg", "jpeg", "png", "webp"];

  for (const extension of extensions) {
    const filePath = path.join(process.cwd(), "public", "images", "spots", "photos", `${id}.${extension}`);
    if (fs.existsSync(filePath)) {
      return `/images/spots/photos/${id}.${extension}`;
    }
  }

  return undefined;
}

function sortByEditorialPriority(spots: Spot[]) {
  return [...spots].sort((a, b) => a.priority - b.priority || a.neighborhood.localeCompare(b.neighborhood) || a.name.localeCompare(b.name));
}

function buildRelatedReason(source: Spot, target: Spot) {
  if (target.hiddenGem && source.neighborhood === target.neighborhood) {
    return `A quieter hidden-gem follow-up in ${target.neighborhood} that keeps the route feeling personal.`;
  }

  if (target.hiddenGem && source.district === target.district) {
    return `A more tucked-away stop in ${target.district} when you want the day to feel more local than obvious.`;
  }

  if (source.neighborhood === target.neighborhood) {
    return `Keeps the day anchored in ${target.neighborhood} without forcing a full neighborhood switch.`;
  }

  if (source.category === target.category) {
    return `Another ${target.subcategory.toLowerCase()}-leaning stop when the same appetite still feels right.`;
  }

  return `A nearby Seoul follow-up with a similar local mood.`;
}

function relatedScore(source: Spot, candidate: Spot) {
  let score = 0;

  if (candidate.hiddenGem) score += 40;
  if (source.neighborhood === candidate.neighborhood) score += 30;
  if (source.district === candidate.district) score += 20;
  if (source.category === candidate.category) score += 10;
  score -= candidate.priority;

  return score;
}

/* ── Spot translations ── */

type SpotTranslation = { subcategory?: string; reason?: string };
type SpotTranslationMap = Record<string, SpotTranslation>;

const spotTranslationCache = new Map<string, SpotTranslationMap>();

function loadSpotTranslations(locale: string): SpotTranslationMap {
  if (locale === "en") return {};
  const cached = spotTranslationCache.get(locale);
  if (cached) return cached;

  const filePath = path.join(process.cwd(), "data", "spot-translations", `${locale}.json`);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw) as SpotTranslationMap;
    spotTranslationCache.set(locale, data);
    return data;
  } catch {
    return {};
  }
}

function translateSpot(spot: Spot, translations: SpotTranslationMap): Spot {
  const t = translations[spot.id];
  if (!t) return spot;
  return {
    ...spot,
    ...(t.subcategory ? { subcategory: t.subcategory } : {}),
    ...(t.reason ? { shortPitch: t.reason, description: t.reason, localInsight: t.reason } : {}),
  };
}

function translateSpots(spots: Spot[], locale?: string): Spot[] {
  if (!locale || locale === "en") return spots;
  const translations = loadSpotTranslations(locale);
  if (Object.keys(translations).length === 0) return spots;
  return spots.map((spot) => translateSpot(spot, translations));
}

function translateRelatedSpots(relatedBySpotId: Record<string, RelatedSpot[]>, locale?: string): Record<string, RelatedSpot[]> {
  if (!locale || locale === "en") return relatedBySpotId;
  const translations = loadSpotTranslations(locale);
  if (Object.keys(translations).length === 0) return relatedBySpotId;
  return Object.fromEntries(
    Object.entries(relatedBySpotId).map(([id, spots]) => [
      id,
      spots.map((spot) => {
        const translated = translateSpot(spot, translations);
        return { ...translated, reason: spot.reason };
      }),
    ]),
  );
}

/* ── Public API (all user-scoped) ── */

export function validateContentGraph(username: string) {
  const mainSpots = getMainSpots(username);

  for (const spot of mainSpots) {
    const related = getRelatedSpots(username, spot.id);
    if (related.length === 0) {
      throw new Error(`Seed spot "${spot.id}" has no related recommendations.`);
    }
  }
}

export function getProfileBundle(username: string, locale?: string) {
  if (locale && locale !== "en") {
    return getLocalizedProfile(username as Username, locale);
  }
  return getUserContent(username).profile;
}

export function getAllSpots(username: string) {
  return sortByEditorialPriority(getUserContent(username).spots);
}

export function getMainSpots(username: string) {
  return sortByEditorialPriority(getUserContent(username).spots.filter((spot) => spot.type === "main"));
}

export function getFeaturedSpots(username: string) {
  return getMainSpots(username).slice(0, 12);
}

export function getHiddenGems(username: string) {
  return sortByEditorialPriority(getUserContent(username).spots.filter((spot) => spot.type === "hidden_gem"));
}

export function getSpotById(username: string, id: string) {
  return getUserContent(username).spotMap.get(id) ?? null;
}

export function getRelatedSpots(username: string, id: string): RelatedSpot[] {
  const source = getSpotById(username, id);
  if (!source) {
    return [];
  }

  return getAllSpots(username)
    .filter((candidate) => candidate.id !== source.id)
    .sort((a, b) => relatedScore(source, b) - relatedScore(source, a))
    .slice(0, 3)
    .map((spot) => ({
      ...spot,
      reason: buildRelatedReason(source, spot),
    }));
}

export function getRelatedBySpotId(username: string) {
  return Object.fromEntries(getUserContent(username).spots.map((spot) => [spot.id, getRelatedSpots(username, spot.id)]));
}

export function getNeighborhoodSummary(username: string) {
  const counts = new Map<string, number>();

  for (const spot of getMainSpots(username)) {
    counts.set(spot.neighborhood, (counts.get(spot.neighborhood) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getHomepageData(username: string, locale?: string): HomepageData {
  return {
    profile: getProfileBundle(username, locale),
    featuredSpots: translateSpots(getFeaturedSpots(username), locale),
    mainSpots: translateSpots(getMainSpots(username), locale),
    hiddenGems: translateSpots(getHiddenGems(username), locale),
    allSpots: translateSpots(getAllSpots(username), locale),
    relatedBySpotId: translateRelatedSpots(getRelatedBySpotId(username), locale),
    neighborhoods: getNeighborhoodSummary(username),
  };
}
