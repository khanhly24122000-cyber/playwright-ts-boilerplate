import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private header = 'h2';

  async verifyLoginSuccess() {
    await expect(this.page.locator(this.header))
      .toHaveText('Secure Area');
  }
}
