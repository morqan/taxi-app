import { http, HttpResponse } from 'msw';

import type { AddCardBody, PaymentCard } from '@/api/types';

import { db } from '../db';
import { url } from './url';

let cardSeq = db.cards.length;

export const paymentsHandlers = [
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
];
