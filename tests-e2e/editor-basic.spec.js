import { test, expect } from '@playwright/test';

test('editor shows database picker and toolbar actions', async ({ page }) => {
  await page.goto('/editor');

  await expect(page.getByText('Choose a database')).toBeVisible();

  await page.getByRole('button', { name: 'Confirm' }).isDisabled();

  await page.getByText('MySQL').click();

  await expect(page.getByRole('button', { name: 'Confirm' })).toBeEnabled();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await expect(page.getByText('Add table')).toBeVisible();
  await expect(page.getByText('Export SQL')).toBeVisible();
});

