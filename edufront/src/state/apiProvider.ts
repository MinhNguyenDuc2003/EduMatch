import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';
import { INews, IScholarship } from '@/lib/schemas';

// API Endpoints
const API_ENDPOINTS = {
  PROVIDER_PROFILE: '/api/customer/storefront/provider/profile',
  SCHOLARSHIP: '/api/scholarship/scholarships',
  FOLLOW_PROVIDER: '/api/profile/followers',
  GET_FOLLOWED_PROVIDERS: '/api/profile/followers/providers',
  GET_PROVIDER_BY_ID: '/api/profile/providers',
  APPLICATION: '/api/scholarship/applications-scholarship',
  NEWS: '/api/profile/provider-new',
} as const;

export const apiProvider = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiProvider',
  tagTypes: ['Profile', 'Scholarships', 'Applications', 'News'],
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
    followProvider: build.mutation<void, number>({
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
    getFollowedProviders: build.query<ProviderProfile[], void>({
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

    // Get all applications by scholarship ID
    getApplicationsByScholarshipId: build.query<ApplicationScholarship[], number>({
      query: (scholarshipId) => ({
        url: `${API_ENDPOINTS.APPLICATION}/by-scholarship?scholarshipId=${scholarshipId}`,
        method: 'GET',
      }),
      providesTags: (result, error, scholarshipId) => [{ type: 'Applications', id: scholarshipId }],
    }),

    // Update application status
    updateApplicationStatus: build.mutation<ApplicationScholarship, UpdateApplicationStatusRequest>(
      {
        query: (applicationScholarship) => ({
          url: `${API_ENDPOINTS.APPLICATION}`,
          method: 'PUT',
          body: applicationScholarship,
        }),
        invalidatesTags: ['Applications'],
      }
    ),

    // News
    getNews: build.query<News[], void>({
      query: () => `${API_ENDPOINTS.NEWS}/my-news`,
      providesTags: ['News'],
    }),

    createNews: build.mutation<News, FormData>({
      query: (formData) => ({
        url: API_ENDPOINTS.NEWS,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['News'],
    }),

    getNewsById: build.query<News, number | string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.NEWS}/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'News', id: String(id) }],
    }),

    updateNews: build.mutation<News, INews>({
      query: (data) => ({
        url: `${API_ENDPOINTS.NEWS}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['News'],
    }),

    deleteNews: build.mutation<null, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.NEWS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['News'],
    }),

    uploadNewsImages: build.mutation<boolean, { newsId: string; formData: FormData }>({
      query: ({ newsId, formData }) => ({
        url: `${API_ENDPOINTS.NEWS}/${newsId}/images`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { newsId }) => [{ type: 'News', id: newsId! }],
    }),

    deleteNewsImage: build.mutation<boolean, { newsId: string; imagesId: number[] }>({
      query: ({ newsId, imagesId }) => ({
        url: `${API_ENDPOINTS.NEWS}/${newsId}/images`,
        method: 'DELETE',
        body: imagesId,
      }),
      invalidatesTags: (result, error, { newsId }) => [{ type: 'News', id: newsId! }],
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
  useGetApplicationsByScholarshipIdQuery,
  useUpdateApplicationStatusMutation,
  useGetNewsQuery,
  useCreateNewsMutation,
  useGetNewsByIdQuery,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
  useUploadNewsImagesMutation,
  useDeleteNewsImageMutation,
} = apiProvider;
