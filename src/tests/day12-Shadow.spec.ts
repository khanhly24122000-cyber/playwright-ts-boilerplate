
import { test, expect } from '@playwright/test';
test('Day12 - Shadow DOM handling', async ({ page }) => {
 await page.goto('https://letcode.in/shadow/');
 await page.locator('#fname').fill('Tham');
 await page.locator('#lname').fill('Nguyen');
 await page.locator('#email').fill('tham@gmail.com');
 await expect(page.locator('#fname')).toHaveValue('Tham');
 await expect(page.locator('#lname')).toHaveValue('Nguyen');
 await expect(page.locator('#email')).toHaveValue('tham@gmail.com');
})