import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';

const API_ENDPOINTS = {
  SUBSCRIPTION_PLAN: '/api/subscription/subscription/subscription/plans',
  SUBSCRIPTION: '/api/subscription/subscription/subscription',
};

export const apiSubscription = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiSubscription',
  tagTypes: ['SubscriptionPlan', 'Subscription'],
  endpoints: (build) => ({
    getSubscriptionPlanById: build.query<SubscriptionPlan, number | string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.SUBSCRIPTION_PLAN}/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'SubscriptionPlan', id }],
    }),
    getSubscription: build.query<Subscription[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.SUBSCRIPTION}/plans/all`,
        method: 'GET',
      }),
      providesTags: ['Subscription'],
    }),
  }),
});

export const { useGetSubscriptionPlanByIdQuery, useGetSubscriptionQuery } = apiSubscription;
