import { Page, Locator, expect } from '@playwright/test';
import { WaitHelper } from '../helpers/wait.helper';

export class BasePage {
  protected page: Page;
  protected wait: WaitHelper;

  constructor(page: Page) {
    this.page = page;
    this.wait = new WaitHelper(page);
  }

  async open(path: string) {
    await this.page.goto(path);
    await this.wait.forDomContentLoaded();
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }

  async verifyUrl(urlPattern: string | RegExp) {
    await expect(this.page).toHaveURL(urlPattern);
  }

  async verifyTitle(title: string | RegExp) {
    await expect(this.page).toHaveTitle(title);
  }

  async clickElement(locator: Locator) {
    await locator.click();
  }

  async fillInput(locator: Locator, value: string) {
    await locator.clear();
    await locator.fill(value);
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? '';
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async screenshot(name: string) {
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png` });
  }
}
