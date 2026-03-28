import { defineConfig, devices } from '@playwright/test';
import { ENV } from './src/utils/env';

export default defineConfig({
  testDir: './src/tests',
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  retries: ENV.RETRIES,
  workers: ENV.WORKERS,
  fullyParallel: true,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  use: {
    baseURL: ENV.BASE_URL,
    headless: ENV.HEADLESS,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
