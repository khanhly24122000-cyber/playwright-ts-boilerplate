import { test, expect } from '@playwright/test';

test('Day14 Mini Project - Travel Search', async ({ page }) => {
  await page.goto('https://www.booking.com');

  const cookieBtn = page.locator('button:has-text("Accept")');

  if (await cookieBtn.isVisible()) {

    await cookieBtn.click();

  }
  await page.locator('[aria-label="Where are you going?"]').fill('Da Nang');

  await page.getByRole('option', { name: /Da Nang/i }).first().waitFor();

    await page.getByRole('option', { name: /Da Nang/i }).first().click();

  await page.locator('[data-testid="searchbox-dates-container"]').click();
  await page.locator('[data-date="2026-03-01"]').click();
  await page.locator('[data-date="2026-03-02"]').click();

  await page.locator('[data-testid="occupancy-config"]').click();
  await page.locator('button:has-text("Done")').click();

  await page.locator('button[type="submit"]').click();

  const results = page.locator('[data-testid="property-card"]');

  await expect(results.first()).toBeVisible();

  const count = await results.count();

  expect(count).toBeGreaterThan(0);

});
 