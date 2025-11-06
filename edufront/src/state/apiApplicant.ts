import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';
import { ProfileApiResponse } from '@/@screen/(dashboard)/applicant/Profile/types';
import { IApplicantProfile } from '@/lib/schemas';

// API Endpoints
const API_ENDPOINTS = {
  CUSTOMER_PROFILE: '/customer/storefront/customer/profile',
  CREATE_PROFILE: '/customer/storefront/customer/profile',
  UPDATE_PROFILE: '/customer/storefront/customer/profile',
  APPLICATION: '/scholarship/applications',
} as const;

export const apiApplicant = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiApplicant',
  tagTypes: ['Profile', 'Application'],
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

    // Create application
    createApplication: build.mutation<Application, FormData>({
      query: (data) => ({
        url: API_ENDPOINTS.APPLICATION,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Application'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useCreateApplicationMutation,
} = apiApplicant;
