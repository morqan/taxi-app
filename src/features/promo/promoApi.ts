import { baseApi } from '@/api/baseApi';
import type { ApplyPromoBody, PromoResult } from '@/api/types';

export const promoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    applyPromo: build.mutation<PromoResult, ApplyPromoBody>({
      query: (body) => ({ url: 'promo/apply', method: 'POST', body }),
    }),
  }),
});

export const { useApplyPromoMutation } = promoApi;
