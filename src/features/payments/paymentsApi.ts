import { baseApi } from '@/api/baseApi';
import type { AddCardBody, PaymentCard } from '@/api/types';

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCards: build.query<PaymentCard[], void>({
      query: () => 'payment-methods',
      providesTags: ['Cards'],
    }),
    addCard: build.mutation<PaymentCard, AddCardBody>({
      query: (body) => ({ url: 'payment-methods', method: 'POST', body }),
      invalidatesTags: ['Cards'],
    }),
    deleteCard: build.mutation<void, string>({
      query: (id) => ({ url: `payment-methods/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Cards'],
    }),
  }),
});

export const { useGetCardsQuery, useAddCardMutation, useDeleteCardMutation } = paymentsApi;
