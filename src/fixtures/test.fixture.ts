import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ApiHelper } from '../helpers/api.helper';

type PageFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  apiHelper: ApiHelper;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  apiHelper: async ({ request }, use) => {
    await use(new ApiHelper(request));
  },
});

export { expect } from '@playwright/test';
