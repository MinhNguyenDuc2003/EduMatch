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
  VERIFY_PROVIDERS_EMAIL: '/api/profile/providers/verify',
  PROVIDER_FAVORITES: '/api/profile/provider-favourite',
} as const;

export const apiProvider = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiProvider',
  tagTypes: ['Profile', 'Scholarships', 'Applications', 'News', 'ProviderFavorites'],
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

    sendVerificationEmail: build.query<boolean, { email: string }>({
      query: ({ email }) => ({
        url: `${API_ENDPOINTS.VERIFY_PROVIDERS_EMAIL}/mail`,
        method: 'GET',
        params: { email },
      }),
    }),

    verifyProvidersEmailCode: build.query<boolean, { code: string }>({
      query: ({ code }) => ({
        url: `${API_ENDPOINTS.VERIFY_PROVIDERS_EMAIL}/code`,
        method: 'GET',
        params: { code },
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

    getAllApplications: build.query<ApplicationScholarship[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.APPLICATION}/by-provider`,
        method: 'GET',
      }),
      providesTags: ['Applications'],
    }),

    // Get all applications by scholarship ID
    getApplicationsByScholarshipId: build.query<
      ApplicationScholarship[],
      { scholarshipId: number }
    >({
      query: ({ scholarshipId }) => ({
        url: `${API_ENDPOINTS.APPLICATION}/by-scholarship`,
        method: 'GET',
        params: { scholarshipId },
      }),
      providesTags: (result, error, { scholarshipId }) => [
        { type: 'Applications', id: scholarshipId },
      ],
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

    // Get All News
    getAllNews: build.query<News[], void>({
      query: () => ({
        url: API_ENDPOINTS.NEWS,
        method: 'GET',
      }),
      providesTags: ['News'],
    }),

    getStatistics: build.query<Statistics, void>({
      query: () => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/provider/statistics`,
        method: 'GET',
      }),
    }),

    referApplicants: build.mutation<boolean, { scholarshipId: number; userIds: string[] }>({
      query: ({ scholarshipId, userIds }) => ({
        url: `${API_ENDPOINTS.PROVIDER_FAVORITES}/refer/all`,
        method: 'POST',
        body: { scholarshipId, userIds },
      }),
      invalidatesTags: ['ProviderFavorites'],
    }),

    getRecommendedApplicants: build.query<
      ApplicantProfile[],
      { scholarshipId: number; topK: number }
    >({
      query: ({ scholarshipId, topK }) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/recommendation/applicant`,
        method: 'GET',
        params: { scholarshipId, topK },
      }),
    }),

    addFavouriteApplicant: build.mutation<
      void,
      { userId: string; providerId: number; note: string }
    >({
      query: ({ userId, providerId, note }) => ({
        url: `${API_ENDPOINTS.PROVIDER_FAVORITES}`,
        method: 'POST',
        body: { userId, providerId, note },
      }),
      invalidatesTags: ['ProviderFavorites'],
    }),

    getAllFavouriteApplicants: build.query<FavouriteApplicant[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.PROVIDER_FAVORITES}/my-favourite`,
        method: 'GET',
      }),
      providesTags: ['ProviderFavorites'],
    }),

    removeFavouriteApplicant: build.mutation<void, number>({
      query: (applicantId) => ({
        url: `${API_ENDPOINTS.PROVIDER_FAVORITES}/${applicantId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ProviderFavorites'],
    }),

    getTopViewedScholarships: build.query<Scholarship[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/top-views/provider/month`,
        method: 'GET',
      }),
      providesTags: ['Scholarships'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useLazySendVerificationEmailQuery,
  useLazyVerifyProvidersEmailCodeQuery,
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
  useGetAllApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useGetNewsQuery,
  useCreateNewsMutation,
  useGetNewsByIdQuery,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
  useUploadNewsImagesMutation,
  useDeleteNewsImageMutation,
  useGetAllNewsQuery,
  useGetStatisticsQuery,
  useGetRecommendedApplicantsQuery,
  useReferApplicantsMutation,
  useAddFavouriteApplicantMutation,
  useGetAllFavouriteApplicantsQuery,
  useRemoveFavouriteApplicantMutation,
  useGetTopViewedScholarshipsQuery,
} = apiProvider;
