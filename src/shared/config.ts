import Config from 'react-native-config';

/**
 * Единая точка чтения окружения. Значения инжектятся через react-native-config
 * (файл .env, нативная сборка). Фолбэки позволяют работать в dev/моке до нативной линковки.
 */
export const config = {
  apiUrl: Config.API_URL ?? 'http://localhost:3000',
  useMock: (Config.USE_MOCK ?? 'true') === 'true',
  googleMapsApiKey: Config.GOOGLE_MAPS_API_KEY ?? '',
} as const;
