import { IProfileForm } from '@/lib/schemas';

export const DEFAULT_PROFILE_FORM_VALUES: IProfileForm = {
  Fields: {
    applicantProfile: {
      contactName: '',
      firstName: '',
      lastName: '',
      religion: '',
      hometown: '',
      citizenshipStatus: '',
      ethnicity: '',
      race: '',
      militaryFamilyHistory: false,
      disabilities: '',
      medicalConditions: '',
      favoriteActivities: '',
      sportsParticipated: '',
      studentActivities: '',
      organizationsJoined: '',
      researchExperience: '',
      careerGoals: '',
      overallGpa: 0,
      certificates: [],
      educationHistories: [],
      phoneNumbers: [],
      skills: [],
      intentions: [],
    },
    addressPostVm: {
      contactName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      zipCode: '',
      districtId: 0,
      stateOrProvinceId: 0,
      countryId: 0,
    },
  },
  Filters: {},
};

export const API_ENDPOINTS = {
  CUSTOMER_PROFILE: '/customer/storefront/customer/profile',
  COUNTRIES: '/location/backoffice/countries',
  STATE_OR_PROVINCES: '/location/storefront/state-or-provinces',
  DISTRICTS: '/location/storefront/district',
} as const;
