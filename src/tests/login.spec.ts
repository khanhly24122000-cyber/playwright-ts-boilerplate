import { test, expect } from '../fixtures/test.fixture';
import { HomePage } from '../pages/HomePage';
import { testUsers } from '../utils/testData';

test.describe('Login feature', () => {

  test('Login success', async ({ page, loginPage }) => {
    const homePage = new HomePage(page);

    await loginPage.openLoginPage();
    await loginPage.login(
      testUsers.valid.username,
      testUsers.valid.password
    );

    await homePage.verifyLoginSuccess();
  });

  test('Login failed', async ({ loginPage }) => {
    await loginPage.openLoginPage();
    await loginPage.login(
      testUsers.invalid.username,
      testUsers.invalid.password
    );

    await loginPage.verifyLoginFailed();
  });
});
