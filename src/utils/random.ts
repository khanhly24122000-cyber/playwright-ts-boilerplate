export function randomString(length = 6): string {
  return Math.random().toString(36).substring(2, 2 + length);
}
