import { test, expect } from "@playwright/test";

test.describe("Страница поиска репозиториев", () => {
  test("Поиск, загрузка и пагинация работают корректно", async ({ page }) => {
    await page.goto("/");
    const searchInput = page.getByPlaceholder("Поиск репозиториев");
    await searchInput.fill("react");

    const items = page.locator('[data-testid="repo-item"]');
    await expect(items.first()).toBeVisible();

    const count = await items.count();
    expect(count).toBeGreaterThan(0);

    await page.getByRole("button", { name: "2" }).click();

    await expect(page).toHaveURL(/query=react/);
    await expect(page).toHaveURL(/page=2/);
  });
});
