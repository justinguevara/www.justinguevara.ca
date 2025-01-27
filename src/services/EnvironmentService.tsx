export default class EnvironmentService {
  public static getUrlBase(): string {
    return import.meta.env.VITE_API_BASE;
  }

  public static getEnvironmentVariable(key: string): string|null {
    return import.meta.env[key] ?? null;
  }
}