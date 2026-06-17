import { config } from '@/shared/config';

// Общий хелпер: абсолютный URL мок-эндпоинта от baseURL приложения.
export const url = (path: string) => `${config.apiUrl}/${path}`;
