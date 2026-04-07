import { describe, expect, it } from "vitest";
import {
  getHiddenGems,
  getHomepageData,
  getRelatedBySpotId,
  getMainSpots,
  validateContentGraph,
} from "@/lib/content";

describe("content graph", () => {
  it("validates the seeded data without broken recommendation edges", () => {
    expect(() => validateContentGraph()).not.toThrow();
  });

  it("provides at least one related spot for every seed spot", () => {
    const relatedBySpotId = getRelatedBySpotId();

    for (const spot of getMainSpots()) {
      expect(relatedBySpotId[spot.id]).toBeDefined();
      expect(relatedBySpotId[spot.id].length).toBeGreaterThan(0);
    }
  });

  it("returns normalized homepage data for the frontend shell", () => {
    const data = getHomepageData();

    expect(data.profile.siteTitle).toContain("Mina");
    expect(data.mainSpots.length).toBe(57);
    expect(getHiddenGems().length).toBe(8);
    expect(data.allSpots.length).toBe(65);
  });
});
