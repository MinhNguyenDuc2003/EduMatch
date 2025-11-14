import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';

const API_ENDPOINTS = {
  SUBSCRIPTION: '/api/subscription/subscription/subscription',
};

export const apiSubscription = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiSubscription',
  tagTypes: ['Subscription'],
  endpoints: (build) => ({
    getSubscription: build.query<Subscription[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.SUBSCRIPTION}/plans/all`,
        method: 'GET',
      }),
      providesTags: ['Subscription'],
    }),
  }),
});

export const { useGetSubscriptionQuery } = apiSubscription;
