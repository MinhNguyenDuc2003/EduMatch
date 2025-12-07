import { IApplicantProfile, IApplication } from "@/lib/schemas";
import { ProfileApiResponse } from "@/types/profile";
import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";

const API_ENDPOINTS = {
  SCHOLARSHIP: "api/scholarship/scholarships",
  SCHOLARSHIPS_SEARCH: "/api/search/scholarships",
  APPLICATION: "/api/scholarship/applications",
  APPLIED_APPLICATION: "/api/scholarship/applications-scholarship",
  FOLLOW_PROVIDER: "/api/profile/followers",
  CUSTOMER_PROFILE: "/api/customer/storefront/customer/profile",
  SUBSCRIPTION: "/api/subscription/subscription",
  SUBSCRIPTION_PLAN: "/api/subscription/subscription/subscription/plans",
  PAYMENT: "/api/payment",
} as const;

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: [
    "Scholarships",
    "Applications",
    "Notifications",
    "AppliedApplication",
    "Providers",
    "Auth",
    "Profile",
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
    getProfile: build.query<ProfileApiResponse, void>({
      query: () => API_ENDPOINTS.CUSTOMER_PROFILE,
      providesTags: ["Profile"],
    }),
    // Create applicant profile
    createProfile: build.mutation<ProfileApiResponse, IApplicantProfile>({
      query: (data) => ({
        url: API_ENDPOINTS.CUSTOMER_PROFILE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    // Update applicant profile
    updateProfile: build.mutation<ProfileApiResponse, IApplicantProfile>({
      query: (data) => ({
        url: API_ENDPOINTS.CUSTOMER_PROFILE,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile"],
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

    getTrackedScholarships: build.query<Scholarship[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/follow`,
        method: "GET",
      }),
      providesTags: ["Scholarships"],
    }),

    getRecommendedScholarships: build.query<Scholarship[], { topK: number }>({
      query: (data) => ({
        url: `${API_ENDPOINTS.SCHOLARSHIP}/recommendation`,
        method: "GET",
        params: data,
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

    getFollowedProviders: build.query<ProviderProfile[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.FOLLOW_PROVIDER}/providers`,
        method: "GET",
      }),
      providesTags: ["Providers"],
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

    getApplicationById: build.query<Application, string | number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.APPLICATION}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: "Applications", id: String(id) },
      ],
    }),

    // Update application
    updateApplication: build.mutation<Application, IApplication>({
      query: (data) => ({
        url: `${API_ENDPOINTS.APPLICATION}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Applications"],
    }),

    // Upload Images for application
    uploadImages: build.mutation<
      boolean,
      { applicationId: string; formData: FormData }
    >({
      query: ({ applicationId, formData }) => ({
        url: `${API_ENDPOINTS.APPLICATION}/${applicationId}/images`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Applications"],
    }),

    // Delete Images for application
    deleteImages: build.mutation<
      boolean,
      { applicationId: string; imagesId: number[] }
    >({
      query: ({ applicationId, imagesId }) => ({
        url: `${API_ENDPOINTS.APPLICATION}/${applicationId}/images`,
        method: "DELETE",
        body: imagesId,
      }),
      invalidatesTags: ["Applications"],
    }),

    getAppliedApplication: build.query<ApplicationScholarship[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.APPLIED_APPLICATION}/my`,
        method: "GET",
      }),
      providesTags: ["AppliedApplication"],
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

    getSubscriptionPlanById: build.query<SubscriptionPlan, number | string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.SUBSCRIPTION_PLAN}/${id}`,
        method: "GET",
      }),
    }),
    getSubscriptionByTargetType: build.query<
      SubscriptionPlan[],
      { targetType: string }
    >({
      query: ({ targetType }) => ({
        url: `${API_ENDPOINTS.SUBSCRIPTION_PLAN}/targetType/${targetType}`,
        method: "GET",
      }),
    }),
    createPaymentIntent: build.mutation<any, { amount: number; email: string }>(
      {
        query: ({ amount, email }) => ({
          url: `${API_ENDPOINTS.PAYMENT}/payment-intent`,
          method: "POST",
          body: { amount, email },
        }),
      }
    ),
    confirmPayment: build.mutation<
      void,
      { transactionId: string; subscriptionPlanId: number }
    >({
      query: ({ transactionId, subscriptionPlanId }) => ({
        url: `${API_ENDPOINTS.SUBSCRIPTION}/orders/confirm-order`,
        method: "POST",
        params: { transactionId, subscriptionPlanId },
      }),
      invalidatesTags: ["Auth"],
    }),
    extendSubscription: build.mutation<
      Subscription,
      {
        subscriptionId: number;
        subscriptionPlanId: number;
        transactionId: string;
      }
    >({
      query: ({ subscriptionId, subscriptionPlanId, transactionId }) => ({
        url: `${API_ENDPOINTS.SUBSCRIPTION}/orders/extend`,
        method: "POST",
        params: { subscriptionId, subscriptionPlanId, transactionId },
      }),
    }),
  }),
});

export const {
  useAuthenticatedQuery,
  useGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
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
  useGetApplicationByIdQuery,
  useGetAppliedApplicationQuery,
  useSubmitApplicationMutation,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useUploadImagesMutation,
  useDeleteImagesMutation,
  useGetNotificationsQuery,
  useLazyReadNotificationsQuery,
  useGetRecommendedScholarshipsQuery,
  useGetTrackedScholarshipsQuery,
  useGetFollowedProvidersQuery,
  useGetSubscriptionPlanByIdQuery,
  useGetSubscriptionByTargetTypeQuery,
  useCreatePaymentIntentMutation,
  useConfirmPaymentMutation,
  useExtendSubscriptionMutation,
} = api;
