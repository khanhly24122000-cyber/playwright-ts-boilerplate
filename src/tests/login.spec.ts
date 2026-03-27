import { test, expect } from '../fixtures/test.fixture';
import { testUsers } from '../utils/testData';

test.describe('Login feature', () => {
  test('Login with valid credentials', async ({ loginPage, homePage }) => {
    await loginPage.openLoginPage();
    await loginPage.login(testUsers.valid.username, testUsers.valid.password);
    await homePage.verifyLoginSuccess();
  });

  test('Login with invalid credentials shows error', async ({ loginPage }) => {
    await loginPage.openLoginPage();
    await loginPage.login(testUsers.invalid.username, testUsers.invalid.password);
    await loginPage.verifyLoginFailed();
  });
});
