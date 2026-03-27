import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLS } from '../constants';

export class LoginPage extends BasePage {
  get usernameInput(): Locator {
    return this.page.locator('#username');
  }

  get passwordInput(): Locator {
    return this.page.locator('#password');
  }

  get loginButton(): Locator {
    return this.page.locator('button[type="submit"]');
  }

  get flashMessage(): Locator {
    return this.page.locator('#flash');
  }

  async openLoginPage() {
    await this.open(URLS.LOGIN);
  }

  async login(username: string, password: string) {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  async verifyLoginFailed() {
    await expect(this.flashMessage).toContainText('invalid');
  }
}
