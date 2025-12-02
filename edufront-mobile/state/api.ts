import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";

const API_ENDPOINTS = {
  SCHOLARSHIP: "api/scholarship/scholarships",
  SCHOLARSHIPS_SEARCH: "/api/search/scholarships",
} as const;

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: ["Scholarships"],
  endpoints: (build) => ({
    // page scholarships with pagination
    pageScholarships: build.query<
      ApiGetScholarshipResponse,
      ScholarshipPageRequest
    >({
      query: (data) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/page`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Scholarships"],
    }),

    // search scholarships with filters
    searchScholarships: build.query<
      ScholarshipSearchResponse,
      ScholarshipSearchRequest
    >({
      query: (data) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIPS_SEARCH}/search`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Scholarships"],
    }),

    getTopViewedScholarships: build.query<Scholarship[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/top-views/month`,
      }),
      providesTags: ["Scholarships"],
    }),
  }),
});

export const {
  usePageScholarshipsQuery,
  useSearchScholarshipsQuery,
  useGetTopViewedScholarshipsQuery,
} = api;
