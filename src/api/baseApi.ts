import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { config } from '@/shared/config';
import { getAccessToken } from '@/shared/secureStorage';

/**
 * Единый RTK Query API. Доменные эндпоинты подключаются через injectEndpoints
 * в src/features/<domain>/<domain>Api.ts. Заменяет старый apisauce + redux-saga слой.
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiUrl,
    timeout: 15000,
    prepareHeaders: async (headers) => {
      const token = await getAccessToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Profile', 'Balance', 'Orders', 'Order', 'Cards', 'News', 'Tariffs'],
  endpoints: () => ({}),
});
