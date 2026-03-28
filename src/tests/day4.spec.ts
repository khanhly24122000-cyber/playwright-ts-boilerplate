import { test, expect } from '@playwright/test';

test.describe('Inventory Sorting', () => {
    test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory.html/);
    });
    const getProductNames = async (page) => {
    return await page.locator('.inventory_item_name').allTextContents();
  };

  const getProductPrices = async (page) => {
    const pricesText = await page.locator('.inventory_item_price').allTextContents();
    return pricesText.map(price =>
      Number(price.replace('$', ''))
    );
  }

  const selectSort = async (page, value: string) => {
    await page.locator('.product_sort_container').selectOption(value);
  };

  // TC-01 + TC-02: Sort Name A -> Z (default)
  test('Sort by Name (A to Z)', async ({ page }) => {
    await selectSort(page, 'az');
    const actualNames = await getProductNames(page);
    const expectedNames = [...actualNames].sort();
    expect(actualNames).toEqual(expectedNames);
    });

  // TC-03: Sort Name Z -> A
  test('Sort bay Nmae (Z to A)', async ({ page }) => {
    await selectSort(page, 'za');
    const actualNames = await getProductNames(page);
    const expectNames = [...actualNames].sort().reverse();
    expect(actualNames).toEqual(expectNames);
  });

  // TC-04: Toggle Name sorting
  test('Toggle Name sorting A-Z ↔ Z-A', async ({ page }) => {
    await selectSort(page, 'za');
    const sortZA = await getProductNames(page);
    await selectSort(page, 'az');
    const sortAZ = await getProductNames(page);
    const expectNames = [...sortAZ].sort();
    expect(expectNames).toEqual(sortAZ);
  });

  // TC-05: Sort Price Low -> High
  test('Sort by Price (Low to High)', async ({ page }) => {
    await selectSort(page, 'lohi');
    const actualPrices = await getProductPrices(page);
    const expectPrices = [...actualPrices].sort((a, b) => a - b);
    expect(actualPrices).toEqual(expectPrices);
  });

  // TC-05: Sort Price High -> Low
  test('Sort by Price (High to Low)', async ({ page }) => {
    await selectSort(page, 'hilo');
    const actualPrices = await getProductPrices(page);
    const expectPrices = [...actualPrices].sort((a, b) => b -a);
    expect(actualPrices).toEqual(expectPrices);
  });

  // TC-07: Toggle Price sorting
  test('Toggle Price sorting High-Low ↔ Low-High', async ({ page }) => {
    await selectSort(page, 'hilo');
    const actualPricesGHilo = await getProductPrices(page);
    await selectSort(page, 'lohi');
    const actualPricesGLohi = await getProductPrices(page);
    const expectPrices = [...actualPricesGLohi].sort((a, b) => a - b);
    expect(actualPricesGLohi).toEqual(expectPrices);
  });

   test('Sorting does not change product count', async ({ page }) => {
    const initialCount = await page
      .locator('.inventory_item')
      .count();

    for (const option of ['az', 'za', 'lohi', 'hilo']) {
      await selectSort(page, option);

      const countAfterSort = await page
        .locator('.inventory_item')
        .count();

      expect(countAfterSort).toBe(initialCount);
    }
  });

  test('Sorting keeps Add to cart state', async ({page}) => {
    await page.getByRole('button', {name: 'Add to cart'}).first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await selectSort(page, 'za');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await expect(page.getByRole('button', {name: 'Remove'}).first()).toBeVisible();
  });

  // TC-10: Refresh page reset sorting
  test('Sorting resets after page refresh', async ({ page }) => {
    await selectSort(page, 'hilo');

    // Reload trang
    await page.reload();

    const actualNames = await getProductNames(page);
    const expectedNames = [...actualNames].sort();

    expect(actualNames).toEqual(expectedNames);
  });

  // TC-11: Verify dropdown sort có đủ option
  test('Sorting dropdown options', async ({ page }) => {
    const options = await page.locator('.product_sort_container option').allTextContents();
    expect(options).toEqual([
      'Name (A to Z)',
      'Name (Z to A)',
      'Price (low to high)',
      'Price (high to low)',
    ]);
  });

});