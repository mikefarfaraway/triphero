import { describe, expect, it } from "vitest";
import { getSubcategoryEmoji, getSubcategoryLabel } from "@/lib/spot-presentation";
import { sampleSpot } from "@/tests/fixtures";

describe("spot presentation helpers", () => {
  it("adds an intuitive emoji for subcategories", () => {
    expect(getSubcategoryEmoji("Kalguksu, Bossam")).toBe("🍜");
    expect(getSubcategoryEmoji("Korean fried chicken")).toBe("🍗");
  });

  it("builds a readable label for the UI", () => {
    expect(getSubcategoryLabel(sampleSpot)).toContain("Dessert cafe");
  });
});
