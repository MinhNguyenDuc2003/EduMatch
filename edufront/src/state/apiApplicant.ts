import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';
import { IApplicantProfile, IApplication } from '@/lib/schemas';

// API Endpoints
const API_ENDPOINTS = {
  CUSTOMER_PROFILE: '/api/customer/storefront/customer/profile',
  CREATE_PROFILE: '/api/customer/storefront/customer/profile',
  UPDATE_PROFILE: '/api/customer/storefront/customer/profile',
  APPLICATION: '/api/scholarship/applications',
  APPLIED_APPLICATION: '/api/scholarship/applications-scholarship',
  FOLLOW_PROVIDER: '/api/profile/followers',
  SCHOLARSHIP_FOLLOW: '/api/scholarship/scholarships/follow',
  REPORT: '/api/report/reports',
  GET_REPORTS: '/api/report/report/category/type',
} as const;

export const apiApplicant = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiApplicant',
  tagTypes: ['Profile', 'Application', 'Follow', 'Scholarships', 'TrackedScholarships', 'Report'],
  endpoints: (build) => ({
    // Get customer profile (works for both applicant and provider)
    getProfile: build.query<ProfileApiResponse, void>({
      query: () => API_ENDPOINTS.CUSTOMER_PROFILE,
      providesTags: ['Profile'],
    }),

    // Create applicant profile
    createProfile: build.mutation<ProfileApiResponse, IApplicantProfile>({
      query: (data) => ({
        url: API_ENDPOINTS.CREATE_PROFILE,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),

    // Update applicant profile
    updateProfile: build.mutation<ProfileApiResponse, IApplicantProfile>({
      query: (data) => ({
        url: API_ENDPOINTS.UPDATE_PROFILE,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),

    // Get all applications for current user
    getApplications: build.query<Application[], void>({
      query: () => ({
        url: API_ENDPOINTS.APPLICATION + '/my-application',
        method: 'GET',
      }),
      providesTags: ['Application'],
    }),
    getApplicationByCode: build.query<Application[], string>({
      query: (code) => ({
        url: `${API_ENDPOINTS.APPLICATION}/code/${code}`,
        method: 'GET',
      }),
      providesTags: ['Application'],
    }),

    // Get application by id
    getApplicationById: build.query<Application, string | number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.APPLICATION}/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Application', id: String(id) }],
    }),

    // Create application
    createApplication: build.mutation<Application, FormData>({
      query: (data) => ({
        url: API_ENDPOINTS.APPLICATION,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Application'],
    }),

    // Update application
    updateApplication: build.mutation<Application, IApplication>({
      query: (data) => ({
        url: `${API_ENDPOINTS.APPLICATION}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Application'],
    }),

    // Upload Images for application
    uploadImages: build.mutation<boolean, { applicationId: string; formData: FormData }>({
      query: ({ applicationId, formData }) => ({
        url: `${API_ENDPOINTS.APPLICATION}/${applicationId}/images`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Application'],
    }),

    // Delete Images for application
    deleteImages: build.mutation<boolean, { applicationId: string; imagesId: number[] }>({
      query: ({ applicationId, imagesId }) => ({
        url: `${API_ENDPOINTS.APPLICATION}/${applicationId}/images`,
        method: 'DELETE',
        body: imagesId,
      }),
      invalidatesTags: ['Application'],
    }),

    submitApplication: build.mutation<
      boolean,
      { applicationId: number; scholarshipId: number; status: string }
    >({
      query: ({ applicationId, scholarshipId, status }) => ({
        url: `${API_ENDPOINTS.APPLICATION}-scholarship`,
        method: 'POST',
        body: { applicationId, scholarshipId, status },
      }),
      invalidatesTags: ['Application'],
    }),

    deleteApplication: build.mutation<boolean, { applicationId: number }>({
      query: ({ applicationId }) => ({
        url: `${API_ENDPOINTS.APPLICATION}/${applicationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Application'],
    }),

    getAppliedApplication: build.query<ApplicationScholarship[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.APPLIED_APPLICATION}/my`,
        method: 'GET',
      }),
      providesTags: ['Application'],
    }),

    // GET REPORTS
    getReports: build.query<ReportCategory[], ReportType>({
      query: (type) => ({
        url: `${API_ENDPOINTS.GET_REPORTS}/${type}`,
        method: 'GET',
      }),
      providesTags: ['Report'],
    }),

    // REPORT SYSTEM
    reportSystem: build.mutation<
      boolean,
      { title: string; comment: string; category: { id: number }; isRead: boolean }
    >({
      query: (data) => ({
        url: API_ENDPOINTS.REPORT,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Report'],
    }),

    // REPORT PROVIDER
    reportProvider: build.mutation<boolean, FormReport & { providerId: number; isRead: boolean }>({
      query: (data) => ({
        url: `${API_ENDPOINTS.REPORT}/provider-report`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Report'],
    }),
    // REPORT SCHOLARSHIP
    reportScholarship: build.mutation<
      boolean,
      FormReport & { scholarshipId: number; isRead: boolean }
    >({
      query: (data) => ({
        url: `${API_ENDPOINTS.REPORT}/scholarship-report`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Report'],
    }),
    // REPORT PROFILE
    reportProfile: build.mutation<boolean, FormReport & { profileId: number; isRead: boolean }>({
      query: (data) => ({
        url: `${API_ENDPOINTS.REPORT}/profile-report`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Report'],
    }),

    // GET MY REPORTS
    getMyReport: build.query<MyReport[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.REPORT}/my-report`,
        method: 'GET',
      }),
      providesTags: ['Report'],
    }),

    // DELETE REPORT
    deleteReport: build.mutation<boolean, { reportId: number }>({
      query: ({ reportId }) => ({
        url: `${API_ENDPOINTS.REPORT}/${reportId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Report'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useGetApplicationsQuery,
  useGetApplicationByIdQuery,
  useGetApplicationByCodeQuery,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useUploadImagesMutation,
  useDeleteImagesMutation,
  useSubmitApplicationMutation,
  useGetAppliedApplicationQuery,
  useDeleteApplicationMutation,
  useGetReportsQuery,
  useReportSystemMutation,
  useReportProviderMutation,
  useReportScholarshipMutation,
  useReportProfileMutation,
  useGetMyReportQuery,
  useDeleteReportMutation,
} = apiApplicant;
