import { http, HttpResponse } from 'msw';

import { db } from '../db';
import { url } from './url';

export const newsHandlers = [http.get(url('news'), () => HttpResponse.json(db.news))];
