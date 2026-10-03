export type RuntimeEnv = { API_BASE_URL?: string; TELEGRAM_BOT_USERNAME?: string; APP_VERSION: string };
export const runtimeEnv: RuntimeEnv = { API_BASE_URL: import.meta.env.VITE_API_BASE_URL, TELEGRAM_BOT_USERNAME: import.meta.env.VITE_TELEGRAM_BOT_USERNAME, APP_VERSION: "3.2.0" };
