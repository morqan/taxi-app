import { baseApi } from '@/api/baseApi';
import type { Balance, UpdateProfileBody, User } from '@/api/types';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<User, void>({
      query: () => 'profile',
      providesTags: ['Profile'],
    }),
    updateProfile: build.mutation<User, UpdateProfileBody>({
      query: (body) => ({ url: 'profile', method: 'PATCH', body }),
      invalidatesTags: ['Profile'],
    }),
    getBalance: build.query<Balance, void>({
      query: () => 'balance',
      providesTags: ['Balance'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useGetBalanceQuery } = profileApi;
