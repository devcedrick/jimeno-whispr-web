import { expect, test } from "@playwright/test";

test("renders the login form", async ({ page }) => {
  await page.goto("/login");

  await expect(
    page.getByRole("heading", { name: "Welcome Back!" }),
  ).toBeVisible();
  await expect(page.getByLabel("Anonymous ID")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign In" })).toBeEnabled();
  await expect(page.getByRole("link", { name: "Create an Account" })).toHaveAttribute(
    "href",
    "/register",
  );
});
