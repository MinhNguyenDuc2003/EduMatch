import { IProviderProfile } from '@/lib/schemas';

export const DEFAULT_PROVIDER_FORM_VALUES: IProviderProfile = {
  providerProfile: {
    organizationName: '',
    organizationType: '',
    website: '',
    email: '',
    phone: '',
    addressSummary: '',
    description: '',
    yearEstablished: undefined,
    accreditation: '',
    specialization: '',
    verified: false,
    country: '',
    providerContactDtos: [],
  },
};

export const ORGANIZATION_TYPES = [
  { value: 'University', label: 'University' },
  { value: 'College', label: 'College' },
  { value: 'Foundation', label: 'Foundation' },
  { value: 'Non-Profit Organization', label: 'Non-Profit Organization' },
  { value: 'Government Agency', label: 'Government Agency' },
  { value: 'Corporation', label: 'Corporation' },
  { value: 'Research Institute', label: 'Research Institute' },
  { value: 'Other', label: 'Other' },
];
