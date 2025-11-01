import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';
import { ProfileApiResponse } from '@/@screen/Profile/types';
import { ProviderProfileApiResponse } from '@/@screen/ProviderProfile/types';
import { IApplicantProfile, IProviderProfile } from '@/lib/schemas';

// API Endpoints
const API_ENDPOINTS = {
  CUSTOMER_PROFILE: '/customer/storefront/customer/profile',
  CREATE_PROFILE: '/customer/storefront/customer/profile',
  UPDATE_PROFILE: '/customer/storefront/customer/profile',
} as const;

export const apiApplicant = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiApplicant',
  tagTypes: ['Profile', 'Countries', 'StateOrProvinces', 'Districts'],
  endpoints: (build) => ({
    // Get customer profile (works for both applicant and provider)
    getProfile: build.query<ProfileApiResponse, void>({
      query: () => API_ENDPOINTS.CUSTOMER_PROFILE,
      providesTags: ['Profile'],
    }),

    // Create applicant profile
    createProfile: build.mutation<ProfileApiResponse, IApplicantProfile>({
      query: (data) => ({
        url: API_ENDPOINTS.CREATE_PROFILE,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),

    // Update applicant profile
    updateProfile: build.mutation<ProfileApiResponse, IApplicantProfile>({
      query: (data) => ({
        url: API_ENDPOINTS.UPDATE_PROFILE,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery, useCreateProfileMutation, useUpdateProfileMutation } =
  apiApplicant;
