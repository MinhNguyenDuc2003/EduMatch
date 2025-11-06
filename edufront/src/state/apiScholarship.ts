import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';

// API Endpoints
const API_ENDPOINTS = {
  SCHOLARSHIPS_PAGE: '/scholarship/scholarships/page',
  SCHOLARSHIPS_SEARCH: '/search/scholarships/search',
  SCHOLARSHIP_DETAIL: '/scholarship/scholarships',
  SCHOLARSHIP_FOLLOW: '/scholarship/scholarships/follow',
} as const;

export const apiScholarship = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiScholarship',
  tagTypes: ['Scholarships'],
  endpoints: (build) => ({
    // Search scholarships with pagination
    searchScholarships: build.query<ScholarshipPageResponse, ScholarshipSearchRequest>({
      query: (data) => ({
        url: API_ENDPOINTS.SCHOLARSHIPS_PAGE,
        method: 'POST',
        body: data,
      }),
      providesTags: ['Scholarships'],
    }),

    // Advanced search scholarships with filters
    searchScholarshipsAdvanced: build.query<
      ScholarshipSearchResponse,
      ScholarshipAdvancedSearchRequest
    >({
      query: (data) => ({
        url: API_ENDPOINTS.SCHOLARSHIPS_SEARCH,
        method: 'POST',
        body: data,
      }),
      providesTags: ['Scholarships'],
    }),

    // Get scholarship detail by id (returns unwrapped inner data)
    getScholarshipById: build.query<ScholarshipDetail, number | string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP_DETAIL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['Scholarships'],
    }),

    // Track/Follow scholarship
    followScholarship: build.mutation<
      { scholarshipId: number; userId: string },
      { scholarshipId: number; userId: string }
    >({
      query: (data) => ({
        url: API_ENDPOINTS.SCHOLARSHIP_FOLLOW,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        'Scholarships',
        { type: 'Scholarships', id: `tracked-${arg.scholarshipId}` },
      ],
    }),

    // Untrack/Unfollow scholarship
    unfollowScholarship: build.mutation<void, { scholarshipId: number; userId: string }>({
      query: (data) => ({
        url: API_ENDPOINTS.SCHOLARSHIP_FOLLOW,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        'Scholarships',
        { type: 'Scholarships', id: `tracked-${arg.scholarshipId}` },
      ],
    }),

    // Get tracked scholarships
    getTrackedScholarships: build.query<ScholarshipWithDetails[], void>({
      query: () => ({
        url: API_ENDPOINTS.SCHOLARSHIP_FOLLOW,
        method: 'GET',
      }),
      providesTags: ['Scholarships'],
    }),

    // Check if scholarship is tracked/followed
    checkIsTrackedScholarship: build.query<
      { scholarshipId: number; userId: string } | null,
      number | string
    >({
      query: (id) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP_FOLLOW}/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [
        'Scholarships',
        { type: 'Scholarships', id: `tracked-${id}` },
      ],
    }),
  }),
});

export const {
  useSearchScholarshipsQuery,
  useSearchScholarshipsAdvancedQuery,
  useGetScholarshipByIdQuery,
  useFollowScholarshipMutation,
  useUnfollowScholarshipMutation,
  useGetTrackedScholarshipsQuery,
  useCheckIsTrackedScholarshipQuery,
} = apiScholarship;
