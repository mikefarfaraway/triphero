import { describe, expect, it } from "vitest";
import {
  getHiddenGems,
  getHomepageData,
  getRelatedBySpotId,
  getMainSpots,
  validateContentGraph,
} from "@/lib/content";

describe("content graph", () => {
  it("validates mina's data without broken recommendation edges", () => {
    expect(() => validateContentGraph("mina")).not.toThrow();
  });

  it("validates mike's data without broken recommendation edges", () => {
    expect(() => validateContentGraph("mike")).not.toThrow();
  });

  it("provides at least one related spot for every seed spot", () => {
    const relatedBySpotId = getRelatedBySpotId("mina");

    for (const spot of getMainSpots("mina")) {
      expect(relatedBySpotId[spot.id]).toBeDefined();
      expect(relatedBySpotId[spot.id].length).toBeGreaterThan(0);
    }
  });

  it("returns normalized homepage data for mina", () => {
    const data = getHomepageData("mina");

    expect(data.profile.siteTitle).toContain("Mina");
    expect(data.mainSpots.length).toBe(57);
    expect(getHiddenGems("mina").length).toBe(8);
    expect(data.allSpots.length).toBe(65);
  });

  it("returns normalized homepage data for mike", () => {
    const data = getHomepageData("mike");

    expect(data.profile.siteTitle).toContain("Mike");
    expect(data.allSpots.length).toBe(65);
  });

  it("throws for unknown username", () => {
    expect(() => getHomepageData("nobody")).toThrow();
  });
});
