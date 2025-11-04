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
