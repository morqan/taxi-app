import { baseApi } from '@/api/baseApi';
import type { NewsItem } from '@/api/types';

export const newsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNews: build.query<NewsItem[], void>({
      query: () => 'news',
      providesTags: ['News'],
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
