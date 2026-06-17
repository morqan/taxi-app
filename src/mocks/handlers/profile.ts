import { http, HttpResponse } from 'msw';

import type { UpdateProfileBody } from '@/api/types';

import { db } from '../db';
import { url } from './url';

export const profileHandlers = [
  http.get(url('profile'), () => HttpResponse.json(db.user)),
  http.patch(url('profile'), async ({ request }) => {
    const body = (await request.json()) as UpdateProfileBody;
    if (body.name !== undefined) db.user.name = body.name;
    if (body.avatarUrl !== undefined) db.user.avatarUrl = body.avatarUrl;
    return HttpResponse.json(db.user);
  }),
  http.get(url('balance'), () => HttpResponse.json(db.balance)),
];
