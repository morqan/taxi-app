import { http, HttpResponse } from 'msw';

import type { AuthSession } from '@/api/types';

import { db } from '../db';
import { url } from './url';

export const authHandlers = [
  http.post(url('auth/otp/request'), () => HttpResponse.json({ requestId: 'req_mock_1' })),
  http.post(url('auth/otp/verify'), () => {
    const session: AuthSession = {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      user: db.user,
    };
    return HttpResponse.json(session);
  }),
];
