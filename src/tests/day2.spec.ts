import { test } from '../fixtures/test.fixture';

test('Locator', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    // Bài 1. CSS locator cơ bản
    // Vào https://www.saucedemo.com
    // Tìm các element:
    // Username input
    // Password input
    // Login button
    // 👉 Dùng page.locator() với CSS
    const username = page.locator("#user-name");
    const password = page.locator("#password");
    const loginbutton = page.getByRole('button', {name: 'Login' });

    // Bài 2. Locator theo id, class, attribute
    // Tìm ô Username bằng:
    // id
    // class
    // attribute [placeholder="Username"]
    const username1 = page.locator('#user-name');
    const username2 = page.locator('.form_input');
    const username3 = page.getByPlaceholder('Username');

    // Bài 3. getByRole
    // Dùng getByRole() tìm:
    // textbox Username
    // textbox Password
    // button Login
    const username4 = page.getByRole('textbox', {name: 'Username'});
    const password2 = page.getByRole('textbox', {name: 'Password'});
    const loginbutton2 = page.getByRole('button', {name: 'Login'});

    // Bài 5. So sánh 3 locator
    // Tìm Username bằng:
    // CSS
    // getByPlaceholder
    // getByRole
    // 👉 Nhận xét locator nào ổn định nhất, vì sao?
    const username5 = page.locator("#user-name");
    const username6 = page.getByRole('textbox', {name: 'Username'});
    const username7 = page.getByPlaceholder('Username');
    // ổn định nhất là getByRole vì Ít thay đổi khi UI refactor
});