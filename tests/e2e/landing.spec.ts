import { expect, test } from "@playwright/test";

test("renders the public landing page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Say It Without Saying Who.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Get Started" })).toHaveAttribute("href", "/login");
  await expect(page.getByRole("heading", { name: "Core Features" })).toBeVisible();
});

test("navigates from the landing page to login", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Get Started" }).click();

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("heading", { name: "Welcome Back!" })).toBeVisible();
});
