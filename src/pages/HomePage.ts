import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  get header(): Locator {
    return this.page.locator('h2');
  }

  get logoutButton(): Locator {
    return this.page.locator('a[href="/logout"]');
  }

  async verifyLoginSuccess() {
    await expect(this.header).toHaveText('Secure Area');
  }

  async logout() {
    await this.clickElement(this.logoutButton);
  }
}
