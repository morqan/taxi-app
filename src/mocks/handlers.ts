import { http, HttpResponse } from 'msw';

import type {
  AddCardBody,
  ApplyPromoBody,
  AuthSession,
  CreateOrderBody,
  Order,
  PaymentCard,
  UpdateProfileBody,
} from '@/api/types';
import { config } from '@/shared/config';

import { db } from './db';

const url = (path: string) => `${config.apiUrl}/${path}`;

let orderSeq = db.orders.length;
let cardSeq = db.cards.length;

export const handlers = [
  // --- auth (OTP) ---
  http.post(url('auth/otp/request'), () => HttpResponse.json({ requestId: 'req_mock_1' })),
  http.post(url('auth/otp/verify'), () => {
    const session: AuthSession = {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      user: db.user,
    };
    return HttpResponse.json(session);
  }),

  // --- profile / balance ---
  http.get(url('profile'), () => HttpResponse.json(db.user)),
  http.patch(url('profile'), async ({ request }) => {
    const body = (await request.json()) as UpdateProfileBody;
    if (body.name !== undefined) db.user.name = body.name;
    if (body.avatarUrl !== undefined) db.user.avatarUrl = body.avatarUrl;
    return HttpResponse.json(db.user);
  }),
  http.get(url('balance'), () => HttpResponse.json(db.balance)),

  // --- tariffs / orders ---
  http.get(url('tariffs'), () => HttpResponse.json(db.tariffs)),
  http.get(url('orders'), () => HttpResponse.json(db.orders)),
  http.get(url('orders/:id'), ({ params }) => {
    const order = db.orders.find((o) => o.id === params.id);
    return order ? HttpResponse.json(order) : new HttpResponse(null, { status: 404 });
  }),
  http.post(url('orders'), async ({ request }) => {
    const body = (await request.json()) as CreateOrderBody;
    const tariff = db.tariffs.find((t) => t.id === body.tariffId);
    if (!tariff) {
      return HttpResponse.json({ message: 'Tariff tapılmadı' }, { status: 400 });
    }
    const order: Order = {
      id: String(++orderSeq),
      startPlace: body.startPlace,
      endPlace: body.endPlace,
      price: Number((tariff.basePrice + tariff.pricePerKm * 8).toFixed(2)),
      currency: 'AZN',
      type: tariff.type,
      status: 'searching',
      createdAt: new Date().toISOString(),
      driver: null,
    };
    db.orders.unshift(order);
    return HttpResponse.json(order, { status: 201 });
  }),
  http.post(url('orders/:id/cancel'), ({ params }) => {
    const order = db.orders.find((o) => o.id === params.id);
    if (!order) return new HttpResponse(null, { status: 404 });
    order.status = 'cancelled';
    return HttpResponse.json(order);
  }),
  http.post(url('orders/:id/rate'), ({ params }) => {
    const order = db.orders.find((o) => o.id === params.id);
    if (!order) return new HttpResponse(null, { status: 404 });
    order.status = 'completed';
    return HttpResponse.json(order);
  }),

  // --- payment methods ---
  http.get(url('payment-methods'), () => HttpResponse.json(db.cards)),
  http.post(url('payment-methods'), async ({ request }) => {
    const body = (await request.json()) as AddCardBody;
    // В моке принимаем только PSP-токен — сырые PAN/CVC через слой не проходят.
    const card: PaymentCard = {
      id: `c${++cardSeq}`,
      brand: 'visa',
      last4: body.token.slice(-4).padStart(4, '0'),
      isDefault: db.cards.length === 0,
    };
    db.cards.push(card);
    return HttpResponse.json(card, { status: 201 });
  }),
  http.delete(url('payment-methods/:id'), ({ params }) => {
    db.cards = db.cards.filter((c) => c.id !== params.id);
    return new HttpResponse(null, { status: 204 });
  }),

  // --- promo ---
  http.post(url('promo/apply'), async ({ request }) => {
    const body = (await request.json()) as ApplyPromoBody;
    const valid = body.code.trim().toUpperCase() === 'TAXI2026';
    return HttpResponse.json({
      valid,
      discountPercent: valid ? 15 : 0,
      message: valid ? 'Promokod tətbiq olundu' : 'Yanlış promokod',
    });
  }),

  // --- news ---
  http.get(url('news'), () => HttpResponse.json(db.news)),
];
