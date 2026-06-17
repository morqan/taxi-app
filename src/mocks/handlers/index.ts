import { authHandlers } from './auth';
import { newsHandlers } from './news';
import { ordersHandlers } from './orders';
import { paymentsHandlers } from './payments';
import { profileHandlers } from './profile';
import { promoHandlers } from './promo';

export const handlers = [
  ...authHandlers,
  ...profileHandlers,
  ...ordersHandlers,
  ...paymentsHandlers,
  ...promoHandlers,
  ...newsHandlers,
];
