import { baseApi } from '@/api/baseApi';
import type { CreateOrderBody, Order, RateOrderArgs, Tariff } from '@/api/types';

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTariffs: build.query<Tariff[], void>({
      query: () => 'tariffs',
      providesTags: ['Tariffs'],
    }),
    getOrders: build.query<Order[], void>({
      query: () => 'orders',
      providesTags: ['Orders'],
    }),
    getOrder: build.query<Order, string>({
      query: (id) => `orders/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Order', id }],
    }),
    createOrder: build.mutation<Order, CreateOrderBody>({
      query: (body) => ({ url: 'orders', method: 'POST', body }),
      invalidatesTags: ['Orders'],
    }),
    cancelOrder: build.mutation<Order, string>({
      query: (id) => ({ url: `orders/${id}/cancel`, method: 'POST' }),
      invalidatesTags: (_result, _error, id) => ['Orders', { type: 'Order', id }],
    }),
    rateOrder: build.mutation<Order, RateOrderArgs>({
      query: ({ id, stars, comment }) => ({
        url: `orders/${id}/rate`,
        method: 'POST',
        body: { stars, comment },
      }),
      invalidatesTags: (_result, _error, { id }) => ['Orders', { type: 'Order', id }],
    }),
  }),
});

export const {
  useGetTariffsQuery,
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useCancelOrderMutation,
  useRateOrderMutation,
} = ordersApi;
