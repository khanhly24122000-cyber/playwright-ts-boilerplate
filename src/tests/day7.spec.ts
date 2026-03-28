import { test, expect } from '@playwright/test';
 
test('test-day7-E2E checkout Flow', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="username"]').press('ArrowRight');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page. Locator('[data-test="login-button"]').click();
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
 
    const price = await page.locator('[data-test="inventory-item-price"]');
    const firstItemPriceText = await price.nth(0).innerText();
    const secondItemPriceText = await price.nth(1).innerText();
    const firstItemPrice = Number(firstItemPriceText.replace('$', ''));
    const secondItemPrice = Number(secondItemPriceText.replace('$', ''));
    const expectItemTotal = firstItemPrice + secondItemPrice;
 
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill('tham');
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill('nguyen');
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill('123');
    await page.locator('[data-test="postalCode"]').press('ArrowRight');
    await page.locator('[data-test="continue"]').click();
    const itemTotalText = await page.locator('[data-test="subtotal-label"]').innerText();
    const itemTaxText = await page.locator('[data-test="tax-label"]').innerText();
    const itemTotalActualText = await page.locator('[data-test="total-label"]').innerText();
    const itemTotal = Number(itemTotalText.replace('Item total: $', ''));
    const itemTax = Number(itemTaxText.replace('Tax: $', ''));
    const itemTotalActual = Number(itemTotalActualText.replace('Total: $', ''));
 
    expect(itemTotal).toBe(expectItemTotal);
    expect(itemTotalActual).toBeCloseTo(expectItemTotal + itemTax, 2);
   
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});