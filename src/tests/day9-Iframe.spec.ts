import { test, expect } from '@playwright/test';

test.describe('Iframe handling', () => {
  test('Get text from parent iframe and child iframe', async ({ page }) => {
    await page.goto('https://demoqa.com/frames');

    // HANDLE PARENT IFRAME
    const parentFrameText = page
      .frameLocator('#frame1')
      .locator('#sampleHeading');

    await expect(parentFrameText).toHaveText('This is a sample page');

    // HANDLE CHILD IFRAME
    const childFrameText = page
      .frameLocator('#frame2')
      .locator('#sampleHeading');

    await expect(childFrameText).toHaveText('This is a sample page');
  });
});