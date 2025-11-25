import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';

// API Endpoints
const API_ENDPOINTS = {
  SCHOLARSHIP: '/api/scholarship/scholarships',
  SCHOLARSHIPS_SEARCH: '/api/search/scholarships',
} as const;

export const apiScholarship = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiScholarship',
  tagTypes: ['Scholarships'],
  endpoints: (build) => ({
    // page scholarships with pagination
    pageScholarships: build.query<ApiGetScholarshipResponse, ScholarshipPageRequest>({
      query: (data) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/page`,
        method: 'POST',
        body: data,
      }),
      providesTags: ['Scholarships'],
    }),

    // search scholarships with filters
    searchScholarships: build.query<ScholarshipSearchResponse, ScholarshipSearchRequest>({
      query: (data) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIPS_SEARCH}/search`,
        method: 'POST',
        body: data,
      }),
      providesTags: ['Scholarships'],
    }),

    // search scholarships by University
    searchScholarshipsByUniversity: build.query<SearchScholarshipsByUniversityResponse[], string>({
      query: (keyword) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIPS_SEARCH}/autocomplete/university?keyword=${encodeURIComponent(keyword)}`,
        method: 'GET',
      }),
      providesTags: ['Scholarships'],
    }),

    // Get scholarship detail by id (returns unwrapped inner data)
    getScholarshipById: build.query<Scholarship, number | string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/${id}`,
        method: 'GET',
      }),
      providesTags: ['Scholarships'],
    }),

    // Track/Follow scholarship
    followScholarship: build.mutation<void, { scholarshipId: number }>({
      query: (data) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/follow`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Scholarships'],
    }),

    // Untrack/Unfollow scholarship
    unfollowScholarship: build.mutation<void, { scholarshipId: number }>({
      query: (data) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/follow`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['Scholarships'],
    }),

    // Get tracked scholarships
    getTrackedScholarships: build.query<Scholarship[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/follow`,
        method: 'GET',
      }),
      providesTags: ['Scholarships'],
    }),

    // Check if scholarship is tracked/followed
    checkIsTrackedScholarship: build.query<
      { scholarshipId: number; userId: string },
      number | string
    >({
      query: (id) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/follow/${id}`,
        method: 'GET',
      }),
    }),

    getScholarshipBySlug: build.query<Scholarship, string>({
      query: (slug) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/slug?slug=${slug}`,
        method: 'GET',
      }),
      providesTags: ['Scholarships'],
    }),

    // Get all scholarships by provider ID
    getScholarshipsByProviderId: build.query<Scholarship[], number>({
      query: (providerId) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/provider/${providerId}`,
        method: 'GET',
      }),
      providesTags: ['Scholarships'],
    }),

    // Top view by month
    getScholarshipTopViewByMonth: build.query<Scholarship[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/top-views/month`,
        method: 'GET',
      }),
      providesTags: ['Scholarships'],
    }),

    // Analyze scholarship
    analyzeScholarship: build.query<string, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/analyze?scholarshipId=${id}`,
        method: 'GET',
      }),
    }),

    getRecommendedScholarships: build.query<Scholarship[], { topK: number }>({
      query: (data) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/recommendation`,
        method: 'GET',
        params: data,
      }),
      providesTags: ['Scholarships'],
    }),
  }),
});

export const {
  usePageScholarshipsQuery,
  useSearchScholarshipsQuery,
  useSearchScholarshipsByUniversityQuery,
  useGetScholarshipByIdQuery,
  useFollowScholarshipMutation,
  useUnfollowScholarshipMutation,
  useGetTrackedScholarshipsQuery,
  useCheckIsTrackedScholarshipQuery,
  useGetScholarshipBySlugQuery,
  useGetScholarshipsByProviderIdQuery,
  useGetScholarshipTopViewByMonthQuery,
  useAnalyzeScholarshipQuery,
  useGetRecommendedScholarshipsQuery,
} = apiScholarship;
