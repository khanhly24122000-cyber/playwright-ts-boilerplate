import type { EnvironmentConfig } from '../types';

export const ENV: EnvironmentConfig = {
  BASE_URL: process.env.BASE_URL || 'https://the-internet.herokuapp.com',
  HEADLESS: process.env.HEADLESS !== 'false',
  RETRIES: parseInt(process.env.RETRIES || '1', 10),
  WORKERS: parseInt(process.env.WORKERS || '4', 10),
};
