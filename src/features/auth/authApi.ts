import { baseApi } from '@/api/baseApi';
import type { AuthSession, RequestOtpBody, RequestOtpResponse, VerifyOtpBody } from '@/api/types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    requestOtp: build.mutation<RequestOtpResponse, RequestOtpBody>({
      query: (body) => ({ url: 'auth/otp/request', method: 'POST', body }),
    }),
    verifyOtp: build.mutation<AuthSession, VerifyOtpBody>({
      query: (body) => ({ url: 'auth/otp/verify', method: 'POST', body }),
      invalidatesTags: ['Profile', 'Balance'],
    }),
  }),
});

export const { useRequestOtpMutation, useVerifyOtpMutation } = authApi;
