/**
 * Fetch high-resolution place photos from Google Maps Places API.
 *
 * Usage: npx tsx scripts/fetch-place-photos.ts
 *
 * Requires GOOGLE_MAPS_PLACES_API_KEY in .env.local
 */

import fs from "node:fs";
import path from "node:path";

const ENV_PATH = path.resolve(__dirname, "../.env.local");
const CSV_PATH = path.resolve(__dirname, "../data/spots.csv");
const PHOTOS_DIR = path.resolve(__dirname, "../public/images/spots/photos");
const MAX_WIDTH = 1200;

function loadApiKey(): string {
  const env = fs.readFileSync(ENV_PATH, "utf-8");
  const match = env.match(/GOOGLE_MAPS_PLACES_API_KEY=(.+)/);
  if (!match || !match[1].trim()) {
    throw new Error("GOOGLE_MAPS_PLACES_API_KEY not set in .env.local");
  }
  return match[1].trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type SpotRow = {
  name_en: string;
  neighborhood: string;
  google_maps_url: string;
  lat: string;
  lng: string;
};

function parseCsv(content: string): SpotRow[] {
  const lines = content.replace(/^\uFEFF/, "").trim().split("\n");
  const header = lines[0].split(",").map((h) => h.replace(/"/g, ""));
  return lines.slice(1).map((line) => {
    const values: string[] = [];
    let current = "";
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current);
    const row: Record<string, string> = {};
    header.forEach((h, i) => (row[h] = values[i] ?? ""));
    return row as unknown as SpotRow;
  });
}

async function findPlaceId(
  apiKey: string,
  name: string,
  lat: string,
  lng: string,
): Promise<string | null> {
  const url = new URL("https://maps.googleapis.com/maps/api/place/findplacefromtext/json");
  url.searchParams.set("input", name);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("locationbias", `point:${lat},${lng}`);
  url.searchParams.set("fields", "place_id");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString());
  const data = await res.json();
  return data.candidates?.[0]?.place_id ?? null;
}

async function getPhotoReference(
  apiKey: string,
  placeId: string,
): Promise<string | null> {
  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "photos");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString());
  const data = await res.json();
  return data.result?.photos?.[0]?.photo_reference ?? null;
}

async function downloadPhoto(
  apiKey: string,
  photoReference: string,
  destPath: string,
): Promise<boolean> {
  const url = new URL("https://maps.googleapis.com/maps/api/place/photo");
  url.searchParams.set("maxwidth", MAX_WIDTH.toString());
  url.searchParams.set("photo_reference", photoReference);
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString(), { redirect: "follow" });
  if (!res.ok) return false;

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buffer);
  return true;
}

async function main() {
  const apiKey = loadApiKey();
  const csv = fs.readFileSync(CSV_PATH, "utf-8");
  const spots = parseCsv(csv);

  console.log(`Found ${spots.length} spots. Starting photo fetch...\n`);

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const spot of spots) {
    const slug = slugify(`${spot.name_en}-${spot.neighborhood}`);
    const destPath = path.join(PHOTOS_DIR, `${slug}.jpg`);

    process.stdout.write(`[${success + skipped + failed + 1}/${spots.length}] ${spot.name_en}... `);

    // Find Place ID using name + coordinates
    const placeId = await findPlaceId(apiKey, spot.name_en, spot.lat, spot.lng);
    if (!placeId) {
      console.log("SKIP (no place found)");
      skipped++;
      continue;
    }

    // Get photo reference
    const photoRef = await getPhotoReference(apiKey, placeId);
    if (!photoRef) {
      console.log("SKIP (no photos available)");
      skipped++;
      continue;
    }

    // Download high-res photo
    const ok = await downloadPhoto(apiKey, photoRef, destPath);
    if (ok) {
      const stats = fs.statSync(destPath);
      console.log(`OK (${(stats.size / 1024).toFixed(0)} KB)`);
      success++;
    } else {
      console.log("FAIL (download error)");
      failed++;
    }

    // Small delay to respect rate limits
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\nDone! ${success} downloaded, ${skipped} skipped, ${failed} failed.`);
}

main().catch(console.error);
