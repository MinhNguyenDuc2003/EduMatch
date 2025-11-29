type ITopView = {
  id: number;
  providerId: number;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  requirements: string;
  benefits?: string;
  fields: string;
  country: string;
  university: string;
  studyLevel: string;
  scholarshipType: string;
  fundingAmount: string;
  startDate: number; // timestamp in milliseconds
  endDate: number;   // timestamp in milliseconds
  availableSlots: number;
  languageRequirement?: string;
  gpaRequirement?: number;
  providerProfileVo: ProviderProfile;
  scholarshipPreferences: ScholarshipPreference[];
  scholarshipMedias?: ScholarshipMediaa[];
  isFollow: number;
  views: number;
  createdDate: number;
};

type ProviderProfile = {
  id: number;
  userId: string;
  organizationName: string;
  organizationType: string;
  website?: string;
  email?: string;
  phone?: string;
  logoUrl?: string;
  bannerUrl?: string;
  addressSummary?: string;
  description?: string;
  yearEstablished?: number;
  accreditation?: string;
  specialization?: string;
  verified?: boolean;
  country?: string;
  providerContactDtos: ProviderContact[];
  isFollow: number;
};

type ProviderContact = {
  id: number;
  providerId: number;
  contactName: string;
  roleTitle?: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
};

type ScholarshipPreference = {
  id: number;
  scholarshipId: number;
  type: string;
  value: string;
  weight: number;
  note?: string;
};

type ScholarshipMediaa = {
  id: number;
  s3Key: string;
  contentType: string;
  size: number;
  folderName: string;
  fileName: string;
  isPublic: boolean;
  url: string;
};
