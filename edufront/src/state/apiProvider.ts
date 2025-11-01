import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';
import { ProviderProfileApiResponse } from '@/@screen/ProviderProfile/types';

// API Endpoints
const API_ENDPOINTS = {
  PROVIDER_PROFILE: '/customer/storefront/provider/profile',
} as const;

export const apiProvider = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiProvider',
  tagTypes: ['Profile', 'Countries', 'StateOrProvinces', 'Districts'],
  endpoints: (build) => ({
    // Get customer profile (works for both applicant and provider)
    getProfile: build.query<ProviderProfileApiResponse, void>({
      query: () => API_ENDPOINTS.PROVIDER_PROFILE,
      providesTags: ['Profile'],
    }),

    createProfile: build.mutation<ProviderProfileApiResponse, FormData>({
      query: (formData) => ({
        url: API_ENDPOINTS.PROVIDER_PROFILE,
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useCreateProfileMutation } = apiProvider;
