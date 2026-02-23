import { test, expect } from '@playwright/test';
test.describe('JavaScript Alerts handling', () => {
 test.beforeEach(async ({ page }) => {
   await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
 });
 test('Handle JS Alert', async ({ page }) => {
   page.once('dialog', async (dialog) => {
     expect(dialog.type()).toBe('alert');
     expect(dialog.message()).toBe('I am a JS Alert');
     await dialog.accept();
   });
   await page.getByText('Click for JS Alert').click();
   await expect(page.locator('#result')).toHaveText(
     'You successfully clicked an alert'
   );
 });
 test('Handle JS Confirm - Accept', async ({ page }) => {
   page.once('dialog', async (dialog) => {
     expect(dialog.type()).toBe('confirm');
     await dialog.accept();
   });
   await page.getByText('Click for JS Confirm').click();
   await expect(page.locator('#result')).toHaveText('You clicked: Ok');
 });
 test('Handle JS Confirm - Dismiss', async ({ page }) => {
   page.once('dialog', async (dialog) => {
     await dialog.dismiss();
   });
   await page.getByText('Click for JS Confirm').click();
   await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
 });
 test('Handle JS Prompt with input text', async ({ page }) => {
   const inputText = 'Playwright is awesome';
   page.once('dialog', async (dialog) => {
     expect(dialog.type()).toBe('prompt');
     await dialog.accept(inputText);
   });
   await page.getByText('Click for JS Prompt').click();
   console.log("inputText: ", inputText);
   await expect(page.locator('#result')).toHaveText(
     `You entered: ${inputText}`
   );
 });
});