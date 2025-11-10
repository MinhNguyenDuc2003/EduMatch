import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';
import { IScholarship } from '@/lib/schemas';

// API Endpoints
const API_ENDPOINTS = {
  PROVIDER_PROFILE: '/customer/storefront/provider/profile',
  SCHOLARSHIP: '/scholarship/scholarships',
  FOLLOW_PROVIDER: '/profile/followers',
  GET_FOLLOWED_PROVIDERS: '/profile/followers/providers',
  GET_PROVIDER_BY_ID: '/profile/providers',
  APPLICATION: '/scholarship/applications-scholarship',
} as const;

export const apiProvider = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiProvider',
  tagTypes: ['Profile', 'Scholarships', 'Applications'],
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

    // Scholarships
    getScholarships: build.query<Scholarship[], void>({
      query: () => `${API_ENDPOINTS.SCHOLARSHIP}/my-scholarship`,
      providesTags: ['Scholarships'],
    }),

    createScholarship: build.mutation<Scholarship, FormData>({
      query: (formData) => ({
        url: API_ENDPOINTS.SCHOLARSHIP,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Scholarships'],
    }),

    getScholarshipsById: build.query<Scholarship, number | string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Scholarships', id }],
    }),

    updateScholarship: build.mutation<Scholarship, IScholarship>({
      query: (formData) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Scholarships'],
    }),

    deleteScholarship: build.mutation<null, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Scholarships'],
    }),

    uploadImages: build.mutation<boolean, { scholarshipId: string; formData: FormData }>({
      query: ({ scholarshipId, formData }) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/${scholarshipId}/images`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { scholarshipId }) => [
        { type: 'Scholarships', id: scholarshipId! },
      ],
    }),

    deleteImage: build.mutation<boolean, { scholarshipId: string; imagesId: number[] }>({
      query: ({ scholarshipId, imagesId }) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/${scholarshipId}/images`,
        method: 'DELETE',
        body: imagesId,
      }),
      invalidatesTags: (result, error, { scholarshipId }) => [
        { type: 'Scholarships', id: scholarshipId! },
      ],
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

    // Get provider profile by ID
    getProviderProfileById: build.query<ProviderProfile, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.GET_PROVIDER_BY_ID}/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Profile', id: String(id) }],
    }),

    // Get all scholarships by provider ID
    getScholarshipsByProviderId: build.query<Scholarship[], number>({
      query: (providerId) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/provider/${providerId}`,
        method: 'GET',
      }),
      providesTags: (result, error, providerId) => [
        { type: 'Scholarships', id: `provider-${providerId}` },
      ],
    }),

    // Get all applications by scholarship ID
    getApplicationsByScholarshipId: build.query<ApplicationScholarship[], number>({
      query: (scholarshipId) => ({
        url: `${API_ENDPOINTS.APPLICATION}/by-scholarship?scholarshipId=${scholarshipId}`,
        method: 'GET',
      }),
      providesTags: (result, error, scholarshipId) => [{ type: 'Applications', id: scholarshipId }],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useGetScholarshipsQuery,
  useCreateScholarshipMutation,
  useGetScholarshipsByIdQuery,
  useUpdateScholarshipMutation,
  useDeleteScholarshipMutation,
  useUploadImagesMutation,
  useDeleteImageMutation,
  useFollowProviderMutation,
  useUnfollowProviderMutation,
  useGetFollowedProvidersQuery,
  useGetProviderProfileByIdQuery,
  useGetScholarshipsByProviderIdQuery,
  useGetApplicationsByScholarshipIdQuery,
} = apiProvider;
