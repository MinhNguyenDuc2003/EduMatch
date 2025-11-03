import { IScholarship } from '@/lib/schemas';

export const DEFAULT_SCHOLARSHIP_FORM_VALUES: IScholarship = {
  title: '',
  slug: '',
  shortDescription: '',
  description: '',
  requirements: '',
  benefits: '',
  fields: '',
  country: '',
  university: '',
  studyLevel: '',
  scholarshipType: '',
  fundingAmount: '',
  startDate: new Date().getTime(),
  endDate: new Date().getTime(),
  availableSlots: undefined,
  languageRequirement: '',
  gpaRequirement: undefined,
  scholarshipPreferences: [],
};

export const STUDY_LEVELS = [
  { value: 'Undergraduate', label: 'Undergraduate' },
  { value: 'Master', label: 'Master' },
  { value: 'PhD', label: 'PhD' },
  { value: 'Postdoctoral', label: 'Postdoctoral' },
  { value: 'Certificate', label: 'Certificate' },
  { value: 'Diploma', label: 'Diploma' },
];

export const SCHOLARSHIP_TYPES = [
  { value: 'Scholarship', label: 'Scholarship' },
  { value: 'Research Lab', label: 'Research Lab' },
];
