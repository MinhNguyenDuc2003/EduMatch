import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';
import { PaymentIntent } from '@stripe/stripe-js';

const API_ENDPOINTS = {
  SUBSCRIPTION_PLAN: '/api/subscription/subscription/subscription/plans',
  SUBSCRIPTION: '/api/subscription/subscription',
  PAYMENT: '/api/payment',
};

export const apiAuth = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiAuth',
  tagTypes: ['Auth', 'Notifications', 'SubscriptionPlan'],
  endpoints: (build) => ({
    authenticated: build.query<AuthResponse, void>({
      query: () => ({
        url: '/api/customer/authenticated',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
    getNotifications: build.query<UserNotification[], void>({
      query: () => ({
        url: '/api/notification/users/user',
        method: 'GET',
      }),
      providesTags: ['Notifications'],
    }),
    createPaymentIntent: build.mutation<PaymentIntent, { amount: number; email: string }>({
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
    getSubscriptionByTargetType: build.query<SubscriptionPlan[], { targetType: string }>({
      query: ({ targetType }) => ({
        url: `${API_ENDPOINTS.SUBSCRIPTION_PLAN}/targetType/${targetType}`,
        method: 'GET',
      }),
      providesTags: ['SubscriptionPlan'],
    }),
    confirmPayment: build.mutation<void, { transactionId: string; subscriptionPlanId: number }>({
      query: ({ transactionId, subscriptionPlanId }) => ({
        url: `${API_ENDPOINTS.SUBSCRIPTION}/orders/confirm-order`,
        method: 'POST',
        params: { transactionId, subscriptionPlanId },
      }),
      invalidatesTags: ['Auth'],
    }),
    extendSubscription: build.mutation<
      Subscription,
      { subscriptionId: number; subscriptionPlanId: number; transactionId: string }
    >({
      query: ({ subscriptionId, subscriptionPlanId, transactionId }) => ({
        url: `${API_ENDPOINTS.SUBSCRIPTION}/orders/extend`,
        method: 'POST',
        params: { subscriptionId, subscriptionPlanId, transactionId },
      }),
    }),
  }),
});

export const {
  useAuthenticatedQuery,
  useGetNotificationsQuery,
  useGetSubscriptionPlanByIdQuery,
  useCreatePaymentIntentMutation,
  useGetSubscriptionByTargetTypeQuery,
  useConfirmPaymentMutation,
  useExtendSubscriptionMutation,
} = apiAuth;
