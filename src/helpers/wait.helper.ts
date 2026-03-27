import { Page, Locator } from '@playwright/test';
import { TIMEOUTS } from '../constants';

export class WaitHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async forPageLoad() {
    await this.page.waitForLoadState('load');
  }

  async forNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  async forDomContentLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async forElement(locator: Locator, timeout = TIMEOUTS.MEDIUM) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async forElementHidden(locator: Locator, timeout = TIMEOUTS.MEDIUM) {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  async forUrl(urlPattern: string | RegExp, timeout = TIMEOUTS.MEDIUM) {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  async forResponse(urlPattern: string | RegExp, timeout = TIMEOUTS.MEDIUM) {
    return this.page.waitForResponse(urlPattern, { timeout });
  }
}
