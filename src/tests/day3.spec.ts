import { test, expect } from '@playwright/test';

test('Basic Actions (Click, Type, Press)', async ( { page}) => {
    await page.goto('https://www.saucedemo.com');

    
    await page.getByRole('textbox', {name: 'Username'}).fill('standard_user');
    //await page.getByRole('textbox', {name: 'Username'}).fill('');
    await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
    //await page.getByRole('textbox', {name: 'Password'}).fill('');
    //await page.getByRole('button', {name: 'Login'}).click();
    const passwordInput = page.getByRole('textbox', {name: 'Password'});
    await passwordInput.fill('secret_sauce');
    //await passwordInput.type('wrong_password');
    //await passwordInput.press('Control+A');
    //await passwordInput.press('Backspace');
    //await passwordInput.type('secret_sauce');
    const loginBtn = page.getByRole('button', {name: 'Login'});
    //await expect(loginBtn).toBeDisabled();
    //await loginBtn.click();
    //await loginBtn.dblclick();
    await passwordInput.press('Enter');
    await expect(page).toHaveURL(/inventory/);
    //await expect(page.locator('[data-test="error"]')).toContainText('Username is requied');
    //await expect(page.locator('[data-test="error"]')).toContainText('Password is required');

    //force: true la button disable treen UI nhung van click duoc
    //await page.getByRole('button', { name: 'Login' }).click({ force: true });

});