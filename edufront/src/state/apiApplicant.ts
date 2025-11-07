import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';
import { ProfileApiResponse } from '@/@screen/(dashboard)/applicant/Profile/types';
import { IApplicantProfile, IApplication } from '@/lib/schemas';

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

    // Get application by id
    getApplicationById: build.query<Application, string | number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.APPLICATION}/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Application', id: String(id) }],
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

    // Update application
    updateApplication: build.mutation<Application, IApplication>({
      query: (data) => ({
        url: `${API_ENDPOINTS.APPLICATION}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Application'],
    }),

    // Upload Images for application
    uploadImages: build.mutation<boolean, { applicationId: string; formData: FormData }>({
      query: ({ applicationId, formData }) => ({
        url: `${API_ENDPOINTS.APPLICATION}/${applicationId}/images`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Application'],
    }),

    // Delete Images for application
    deleteImages: build.mutation<boolean, { applicationId: string; imagesId: number[] }>({
      query: ({ applicationId, imagesId }) => ({
        url: `${API_ENDPOINTS.APPLICATION}/${applicationId}/images`,
        method: 'DELETE',
        body: imagesId,
      }),
      invalidatesTags: ['Application'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useGetApplicationByIdQuery,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useUploadImagesMutation,
  useDeleteImagesMutation,
} = apiApplicant;
