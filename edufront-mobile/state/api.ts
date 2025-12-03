import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";

const API_ENDPOINTS = {
  SCHOLARSHIP: "api/scholarship/scholarships",
  SCHOLARSHIPS_SEARCH: "/api/search/scholarships",
  APPLICATION: "/api/scholarship/applications",
  FOLLOW_PROVIDER: "/api/profile/followers",
} as const;

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: [
    "Scholarships",
    "Applications",
    "Notifications",
    "Providers",
    "Auth",
  ],
  endpoints: (build) => ({
    authenticated: build.query<AuthResponse, void>({
      query: () => ({
        url: "/api/customer/authenticated",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    getToken: build.query<string, void>({
      query: () => ({
        url: "/api/notification/users/token",
        method: "GET",
      }),
    }),
    getNotifications: build.query<UserNotification[], void>({
      query: () => ({
        url: "/api/notification/users/user",
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),
    readNotifications: build.query<void, number>({
      query: (notificationId) => ({
        url: `/api/notification/users/read/${notificationId}`,
      }),
    }),

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

    getScholarshipBySlug: build.query<Scholarship, string>({
      query: (slug) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/slug?slug=${slug}`,
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

    followScholarship: build.mutation<void, { scholarshipId: number }>({
      query: (data) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/follow`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Scholarships"],
    }),

    // Untrack/Unfollow scholarship
    unfollowScholarship: build.mutation<void, { scholarshipId: number }>({
      query: (data) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/follow`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Scholarships"],
    }),

    // Follow provider
    followProvider: build.mutation<void, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.FOLLOW_PROVIDER}/${id}`,
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["Providers", "Scholarships"],
    }),

    // Unfollow provider
    unfollowProvider: build.mutation<void, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.FOLLOW_PROVIDER}/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Providers", "Scholarships"],
    }),

    getApplications: build.query<Application[], void>({
      query: () => ({
        url: API_ENDPOINTS.APPLICATION + "/my-application",
        method: "GET",
      }),
      providesTags: ["Applications"],
    }),

    // Create application
    createApplication: build.mutation<Application, FormData>({
      query: (data) => ({
        url: API_ENDPOINTS.APPLICATION,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Applications"],
    }),

    submitApplication: build.mutation<
      boolean,
      {
        applicationId: number;
        scholarshipId: number;
        status: string;
        note: string;
      }
    >({
      query: ({ applicationId, scholarshipId, status, note }) => ({
        url: `${API_ENDPOINTS.APPLICATION}-scholarship`,
        method: "POST",
        body: { applicationId, scholarshipId, status, note },
      }),
      invalidatesTags: ["Applications"],
    }),
  }),
});

export const {
  useAuthenticatedQuery,
  useGetTokenQuery,
  usePageScholarshipsQuery,
  useLazySearchScholarshipsQuery,
  useGetTopViewedScholarshipsQuery,
  useGetScholarshipBySlugQuery,
  useFollowScholarshipMutation,
  useUnfollowScholarshipMutation,
  useFollowProviderMutation,
  useUnfollowProviderMutation,
  useGetApplicationsQuery,
  useSubmitApplicationMutation,
  useCreateApplicationMutation,
  useGetNotificationsQuery,
  useLazyReadNotificationsQuery,
} = api;
