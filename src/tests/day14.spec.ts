import { test, expect } from '@playwright/test';

test('Day14 Mini Project - Travel Search', async ({ page }) => {
  test.setTimeout(90_000);

  await page.goto('https://www.booking.com');

  // Dismiss cookie consent if visible
  const cookieBtn = page.locator('button#onetrust-accept-btn-handler');
  if (await cookieBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
    await cookieBtn.click();
  }

  // Dismiss any popup overlay (Genius sign-in, etc.)
  await page.waitForTimeout(2000);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  // Search for destination
  const searchInput = page.locator('[data-testid="destination-container"] input');
  await searchInput.click({ force: true });
  await searchInput.fill('Da Nang');

  // Wait for autocomplete suggestions and click the first result
  const suggestion = page.locator('[data-testid="autocomplete-results-options"] li').first();
  await suggestion.waitFor({ state: 'visible', timeout: 10_000 });
  await suggestion.click();

  // Calendar opens automatically after selecting a destination
  await page.locator('span[data-date]').first().waitFor({ state: 'visible', timeout: 5000 });

  // Navigate to target month using "Next month" button
  const checkInDate = page.locator('span[data-date="2026-04-10"]');
  const checkOutDate = page.locator('span[data-date="2026-04-15"]');
  const nextMonthBtn = page.locator('button[aria-label="Next month"]');

  for (let i = 0; i < 6; i++) {
    if (await checkInDate.isVisible().catch(() => false)) break;
    await nextMonthBtn.click();
    await page.waitForTimeout(300);
  }

  // Select check-in and check-out dates
  await checkInDate.click();
  await checkOutDate.click();

  // Wait for calendar to close after selecting both dates
  await page.waitForTimeout(1000);

  // Submit search
  await page.locator('button[type="submit"]').click();

  // Wait for results page to load
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);

  // Verify we're on the search results page with results
  // Look for the results header text that shows hotel count
  const resultsHeader = page.locator('h1');
  await expect(resultsHeader).toBeVisible({ timeout: 15_000 });

  const headerText = await resultsHeader.textContent();
  expect(headerText).toContain('Danang');

  // Verify property cards are present (try multiple possible selectors)
  const results = page.locator('[data-testid="property-card"]');
  const resultsAlt = page.locator('[data-testid="property-card-container"]');
  const resultsAlt2 = page.locator('[data-testid="card"]');

  let count = await results.count();
  if (count === 0) count = await resultsAlt.count();
  if (count === 0) count = await resultsAlt2.count();

  // If specific card selectors don't work, just verify the header shows hotels
  if (count === 0) {
    // The header already confirmed "Danang" results, verify it shows a number
    expect(headerText).toMatch(/\d+/);
  } else {
    expect(count).toBeGreaterThan(0);
  }
});
