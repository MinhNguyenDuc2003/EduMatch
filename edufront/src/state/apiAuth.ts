import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';

export const apiAuth = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiAuth',
  tagTypes: ['Auth', 'Notifications'],
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
  }),
});

export const { useAuthenticatedQuery, useGetNotificationsQuery } = apiAuth;
