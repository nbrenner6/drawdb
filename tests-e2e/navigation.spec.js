import { test, expect } from '@playwright/test';

test('landing page navigates to editor', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Draw, Copy, and Paste' }),
  ).toBeVisible();

  await page.getByRole('link', { name: 'Try it for yourself' }).click();

  await expect(page).toHaveURL(/\/editor/);
});

