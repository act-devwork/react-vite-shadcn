const requireEnv = (value: string | undefined, fallback: string) => value ?? fallback

export const env = {
  apiBaseUrl: requireEnv(import.meta.env.VITE_API_BASE_URL, '/api'),
  appName: requireEnv(import.meta.env.VITE_APP_NAME, 'Frameflow'),
} as const
