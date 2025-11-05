import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';

// API Endpoints
const API_ENDPOINTS = {
  SCHOLARSHIPS_PAGE: '/scholarship/scholarships/page',
  SCHOLARSHIPS_SEARCH: '/search/scholarships/search',
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
  }),
});

export const { useSearchScholarshipsQuery, useSearchScholarshipsAdvancedQuery } = apiScholarship;
