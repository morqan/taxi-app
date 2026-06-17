import { config } from '@/shared/config';

/**
 * Поднимает MSW mock-бэкенд в dev-режиме при включённом флаге USE_MOCK.
 * Динамический импорт — чтобы msw не попадал в production-бандл.
 */
export async function enableMocking(): Promise<void> {
  if (!__DEV__ || !config.useMock) {
    return;
  }
  const { server } = await import('./server');
  server.listen({ onUnhandledRequest: 'bypass' });
}
