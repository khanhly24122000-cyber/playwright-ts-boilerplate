export const URLS = {
  LOGIN: '/login',
  SECURE: '/secure',
  DROPDOWN: '/dropdown',
  CHECKBOXES: '/checkboxes',
  INPUTS: '/inputs',
  HOVERS: '/hovers',
  KEY_PRESSES: '/key_presses',
  UPLOAD: '/upload',
  DOWNLOAD: '/download',
} as const;

export const MESSAGES = {
  LOGIN_SUCCESS: 'You logged into a secure area!',
  LOGIN_FAILED: 'Your username is invalid!',
  LOGOUT_SUCCESS: 'You logged out of the secure area!',
} as const;

export const TIMEOUTS = {
  SHORT: 5_000,
  MEDIUM: 15_000,
  LONG: 30_000,
  EXTRA_LONG: 60_000,
} as const;
