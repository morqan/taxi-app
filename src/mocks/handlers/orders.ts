import { http, HttpResponse } from 'msw';

import type { CreateOrderBody, Order } from '@/api/types';

import { db } from '../db';
import { url } from './url';

let orderSeq = db.orders.length;

export const ordersHandlers = [
  http.get(url('tariffs'), () => HttpResponse.json(db.tariffs)),
  http.get(url('orders'), () => HttpResponse.json(db.orders)),
  http.get(url('orders/:id'), ({ params }) => {
    const order = db.orders.find((o) => o.id === params.id);
    return order ? HttpResponse.json(order) : new HttpResponse(null, { status: 404 });
  }),
  http.post(url('orders'), async ({ request }) => {
    const body = (await request.json()) as CreateOrderBody;
    const tariff = db.tariffs.find((tr) => tr.id === body.tariffId);
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
];
