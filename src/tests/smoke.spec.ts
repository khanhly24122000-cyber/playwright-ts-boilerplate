import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('Homepage is accessible', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/herokuapp/);
  });

  test('Page title is present', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/The Internet/);
  });
});
