import { test, expect } from '@playwright/test';
 
test('test-day7-E2E checkout Flow', async ({ page }) => {
    // LOGIN
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

// SORT PRICE HIGH → LOW
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
 
    const items = page.locator('.inventory_item');

    const firstItem = items.nth(0);
    const secondItem = items.nth(1);

    const firstPrice = Number(
    (await firstItem.locator('.inventory_item_price').innerText()).replace('$', '')
    );

    const secondPrice = Number(
    (await secondItem.locator('.inventory_item_price').innerText()).replace('$', '')
    );

    const expectedItemTotal = firstPrice + secondPrice;

    await firstItem.locator('button[data-test^="add-to-cart"]').click();
    await secondItem.locator('button[data-test^="add-to-cart"]').click();
 
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="firstName"]').fill('Tham');
    await page.locator('[data-test="lastName"]').fill('Nguyen');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    // VERIFY TOTAL
    const itemTotal = Number(
    (await page.locator('.summary_subtotal_label').innerText())
        .replace('Item total: $', '')
    );

    const tax = Number(
        (await page.locator('.summary_tax_label').innerText())
        .replace('Tax: $', '')
    );

    const total = Number(
        (await page.locator('.summary_total_label').innerText())
        .replace('Total: $', '')
    );

    expect(itemTotal).toBe(expectedItemTotal);
    expect(total).toBeCloseTo(itemTotal + tax, 2);
   
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('.complete-header'))
        .toHaveText('Thank you for your order!');
});