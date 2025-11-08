import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';

export const apiAuth = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiAuth',
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    authenticated: build.query<AuthResponse, void>({
      query: () => ({
        url: '/customer/authenticated',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
  }),
});

export const { useAuthenticatedQuery } = apiAuth;
