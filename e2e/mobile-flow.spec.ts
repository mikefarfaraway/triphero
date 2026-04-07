import { expect, test } from "@playwright/test";

test("supports a mobile-first spot exploration flow", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Mina's Seoul Edit")).toBeVisible();

  await page.getByRole("button", { name: /songjuk/i }).click();
  await expect(page.getByRole("dialog", { name: /songjuk details/i })).toBeVisible();

  await page.getByRole("button", { name: /hanmoechon/i }).click();
  await expect(page.getByRole("dialog", { name: /hanmoechon details/i })).toBeVisible();

  await page.getByRole("button", { name: /close/i }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
