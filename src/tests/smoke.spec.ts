import { test, expect } from '@playwright/test';

test('Homepage is accessible', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/herokuapp/);
});
