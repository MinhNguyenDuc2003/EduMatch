import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './custombaseQuery';
import { ProfileApiResponse, Country, StateOrProvince, District } from '@/@screen/Profile/types';
import { IProfileForm } from '@/lib/schemas';

// API Endpoints
const API_ENDPOINTS = {
  CUSTOMER_PROFILE: '/customer/storefront/customer/profile',
  COUNTRIES: '/location/backoffice/countries',
  STATE_OR_PROVINCES: '/location/storefront/state-or-provinces',
  DISTRICTS: '/location/storefront/district',
  CREATE_PROFILE: '/customer/storefront/customer/profile',
  UPDATE_PROFILE: '/customer/storefront/customer/profile',
} as const;

export const apiApplicant = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'apiApplicant',
  tagTypes: ['Profile', 'Countries', 'StateOrProvinces', 'Districts'],
  endpoints: (build) => ({
    // Get customer profile
    getProfile: build.query<ProfileApiResponse, void>({
      query: () => API_ENDPOINTS.CUSTOMER_PROFILE,
      providesTags: ['Profile'],
    }),

    // Get countries
    getCountries: build.query<Country[], void>({
      query: () => API_ENDPOINTS.COUNTRIES,
      providesTags: ['Countries'],
    }),

    // Get states/provinces by country
    getStateOrProvinces: build.query<StateOrProvince[], number>({
      query: (countryId) => `${API_ENDPOINTS.STATE_OR_PROVINCES}?countryId=${countryId}`,
      providesTags: ['StateOrProvinces'],
    }),

    // Get districts by state/province
    getDistricts: build.query<District[], number>({
      query: (stateOrProvinceId) => `${API_ENDPOINTS.DISTRICTS}/${stateOrProvinceId}`,
      providesTags: ['Districts'],
    }),

    // Create profile
    createProfile: build.mutation<ProfileApiResponse, IProfileForm['Fields']>({
      query: (data) => ({
        url: API_ENDPOINTS.CREATE_PROFILE,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),

    // Update profile
    updateProfile: build.mutation<ProfileApiResponse, IProfileForm['Fields']>({
      query: (data) => ({
        url: API_ENDPOINTS.UPDATE_PROFILE,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetCountriesQuery,
  useGetStateOrProvincesQuery,
  useGetDistrictsQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
} = apiApplicant;
