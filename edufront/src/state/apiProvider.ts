import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';

// API Endpoints
const API_ENDPOINTS = {
  PROVIDER_PROFILE: '/customer/storefront/provider/profile',
  SCHOLARSHIP: '/scholarship/scholarships',
  FOLLOW_PROVIDER: '/profile/followers',
  GET_FOLLOWED_PROVIDERS: '/profile/followers/providers',
} as const;

export const apiProvider = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiProvider',
  tagTypes: ['Profile', 'Scholarships'],
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

    updateProfile: build.mutation<ProviderProfileApiResponse, FormData>({
      query: (formData) => ({
        url: API_ENDPOINTS.PROVIDER_PROFILE,
        method: 'PUT',
        body: formData,
      }),
    }),

    // Create scholarship
    createScholarship: build.mutation<Scholarship, FormData>({
      query: (formData) => ({
        url: API_ENDPOINTS.SCHOLARSHIP,
        method: 'POST',
        body: formData,
      }),
    }),

    getScholarshipsById: build.query<Scholarship, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Scholarships', id }],
    }),

    updateScholarship: build.mutation<Scholarship, FormData>({
      query: (formData) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Scholarships'],
    }),

    // Follow provider
    followProvider: build.mutation<{ userId: string; providerId: number }, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.FOLLOW_PROVIDER}/${id}`,
        method: 'POST',
        body: { id },
      }),
      invalidatesTags: ['Profile', 'Scholarships'],
    }),

    // Unfollow provider
    unfollowProvider: build.mutation<void, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.FOLLOW_PROVIDER}/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: ['Profile', 'Scholarships'],
    }),

    // Get followed providers
    getFollowedProviders: build.query<{ userId: string; providerId: number }[], void>({
      query: () => ({
        url: API_ENDPOINTS.GET_FOLLOWED_PROVIDERS,
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useCreateScholarshipMutation,
  useGetScholarshipsByIdQuery,
  useUpdateScholarshipMutation,
  useFollowProviderMutation,
  useUnfollowProviderMutation,
  useGetFollowedProvidersQuery,
} = apiProvider;
