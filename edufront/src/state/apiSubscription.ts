import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';

const API_ENDPOINTS = {
  SUBSCRIPTION_PLAN: '/api/subscription/subscription/subscription/plans',
} as const;

export const apiSubscription = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiSubscription',
  tagTypes: ['SubscriptionPlan'],
  endpoints: (build) => ({
    getSubscriptionPlanById: build.query<SubscriptionPlan, number | string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.SUBSCRIPTION_PLAN}/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'SubscriptionPlan', id }],
    }),
  }),
});

export const { useGetSubscriptionPlanByIdQuery } = apiSubscription;
