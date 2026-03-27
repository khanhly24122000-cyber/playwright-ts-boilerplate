export interface UserCredentials {
  username: string;
  password: string;
}

export interface TestUsers {
  valid: UserCredentials;
  invalid: UserCredentials;
}

export interface EnvironmentConfig {
  BASE_URL: string;
  HEADLESS: boolean;
  RETRIES: number;
  WORKERS: number;
}
