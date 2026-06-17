import { http, HttpResponse } from 'msw';

import type { ApplyPromoBody } from '@/api/types';

import { url } from './url';

export const promoHandlers = [
  http.post(url('promo/apply'), async ({ request }) => {
    const body = (await request.json()) as ApplyPromoBody;
    // Валидация на «сервере» — клиент не знает правильный код (в отличие от старого хардкода).
    const valid = body.code.trim().toUpperCase() === 'TAXI2026';
    return HttpResponse.json({
      valid,
      discountPercent: valid ? 15 : 0,
      message: valid ? 'Promokod tətbiq olundu' : 'Yanlış promokod',
    });
  }),
];
