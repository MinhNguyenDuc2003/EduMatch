import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';
import { PaymentIntent } from '@stripe/stripe-js';

const API_ENDPOINTS = {
  SUBSCRIPTION_PLAN: '/api/subscription/subscription/subscription/plans',
  PAYMENT: '/api/payment',
};

export const apiSubscription = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiSubscription',
  tagTypes: ['SubscriptionPlan'],
  endpoints: (build) => ({
    createPaymentIntent: build.mutation<
      { paymentIntent: PaymentIntent },
      { amount: number; email: string }
    >({
      query: ({ amount, email }) => ({
        url: `${API_ENDPOINTS.PAYMENT}/payment-intent`,
        method: 'POST',
        body: { amount, email },
      }),
    }),
    getSubscriptionPlanById: build.query<SubscriptionPlan, number | string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.SUBSCRIPTION_PLAN}/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'SubscriptionPlan', id }],
    }),
    getSubscription: build.query<Subscription[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.SUBSCRIPTION_PLAN}/all`,
        method: 'GET',
      }),
      providesTags: ['SubscriptionPlan'],
    }),
  }),
});

export const {
  useGetSubscriptionPlanByIdQuery,
  useGetSubscriptionQuery,
  useCreatePaymentIntentMutation,
} = apiSubscription;
