import * as Keychain from 'react-native-keychain';

import type { AuthTokens } from '@/api/types';

const SERVICE = 'taxi.auth';

/**
 * Токены сессии хранятся в Keychain (iOS) / Keystore (Android) — аппаратно защищённое
 * хранилище, а НЕ в AsyncStorage (одна из критичных находок аудита старого проекта).
 */
export async function saveTokens(tokens: AuthTokens): Promise<void> {
  await Keychain.setGenericPassword('auth', JSON.stringify(tokens), { service: SERVICE });
}

async function readTokens(): Promise<AuthTokens | null> {
  const creds = await Keychain.getGenericPassword({ service: SERVICE });
  if (!creds) {
    return null;
  }
  try {
    return JSON.parse(creds.password) as AuthTokens;
  } catch {
    return null;
  }
}

export async function getAccessToken(): Promise<string | null> {
  const tokens = await readTokens();
  return tokens?.accessToken ?? null;
}

export async function getRefreshToken(): Promise<string | null> {
  const tokens = await readTokens();
  return tokens?.refreshToken ?? null;
}

export async function clearTokens(): Promise<void> {
  await Keychain.resetGenericPassword({ service: SERVICE });
}
