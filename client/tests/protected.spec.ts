import { test, expect } from '@playwright/test';

test('redirects unauthenticated users', async ({ page }) => {
  const response = await page.goto('/profile');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveURL(/\/login$/);
});
