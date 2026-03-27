import { APIRequestContext, expect } from '@playwright/test';

export class ApiHelper {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get(endpoint: string, options?: { params?: Record<string, string> }) {
    const response = await this.request.get(endpoint, options);
    return response;
  }

  async post(endpoint: string, data?: Record<string, unknown>) {
    const response = await this.request.post(endpoint, { data });
    return response;
  }

  async put(endpoint: string, data?: Record<string, unknown>) {
    const response = await this.request.put(endpoint, { data });
    return response;
  }

  async delete(endpoint: string) {
    const response = await this.request.delete(endpoint);
    return response;
  }

  async expectStatus(endpoint: string, status: number) {
    const response = await this.request.get(endpoint);
    expect(response.status()).toBe(status);
    return response;
  }
}
