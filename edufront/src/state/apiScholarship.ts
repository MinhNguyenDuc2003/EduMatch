import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';

// API Endpoints
const API_ENDPOINTS = {
  SCHOLARSHIPS_PAGE: '/api/scholarship/scholarships/page',
  SCHOLARSHIPS_SEARCH: '/api/search/scholarships/search',
  SCHOLARSHIP_DETAIL: '/api/scholarship/scholarships',
  SCHOLARSHIP_FOLLOW: '/api/scholarship/scholarships/follow',
} as const;

export const apiScholarship = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiScholarship',
  tagTypes: ['Scholarships'],
  endpoints: (build) => ({
    // page scholarships with pagination
    pageScholarships: build.query<ApiGetScholarshipResponse, ScholarshipPageRequest>({
      query: (data) => ({
        url: API_ENDPOINTS.SCHOLARSHIPS_PAGE,
        method: 'POST',
        body: data,
      }),
      providesTags: ['Scholarships'],
    }),

    // search scholarships with filters
    searchScholarships: build.query<ScholarshipSearchResponse, ScholarshipSearchRequest>({
      query: (data) => ({
        url: API_ENDPOINTS.SCHOLARSHIPS_SEARCH,
        method: 'POST',
        body: data,
      }),
      providesTags: ['Scholarships'],
    }),

    // Get scholarship detail by id (returns unwrapped inner data)
    getScholarshipById: build.query<Scholarship, number | string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP_DETAIL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['Scholarships'],
    }),

    // Track/Follow scholarship
    followScholarship: build.mutation<void, { scholarshipId: number }>({
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
    unfollowScholarship: build.mutation<void, { scholarshipId: number }>({
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
    getTrackedScholarships: build.query<Scholarship[], void>({
      query: () => ({
        url: API_ENDPOINTS.SCHOLARSHIP_FOLLOW,
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
        url: `${API_ENDPOINTS.SCHOLARSHIP_FOLLOW}/${id}`,
        method: 'GET',
      }),
    }),

    getScholarshipBySlug: build.query<Scholarship, string>({
      query: (slug) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP_DETAIL}/slug?slug=${slug}`,
        method: 'GET',
      }),
      providesTags: ['Scholarships'],
    }),
  }),
});

export const {
  usePageScholarshipsQuery,
  useSearchScholarshipsQuery,
  useGetScholarshipByIdQuery,
  useFollowScholarshipMutation,
  useUnfollowScholarshipMutation,
  useGetTrackedScholarshipsQuery,
  useCheckIsTrackedScholarshipQuery,
  useGetScholarshipBySlugQuery,
} = apiScholarship;
