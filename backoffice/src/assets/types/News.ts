export interface INews {
  id: number;
  providerId: string;
  scholarshipId: string;
  title: string;
  content: string;
  publishedAt: number;
  newsMedias: NewsMedia[];
  scholarship: Scholarship;
}

export interface NewsMedia {
  id: number;
  s3Key: string;
  contentType: string;
  size: number;
  folderName: string;
  fileName: string;
  isPublic: boolean;
  url: string;
}

export interface Scholarship {
  id: number;
  providerId: number;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  requirements: string;
  benefits: string;
  fields: string;
  country: string;
  university: string;
  studyLevel: string;
  scholarshipType: string;
  fundingAmount: string;
  startDate: number;
  endDate: number;
  availableSlots: number;
  languageRequirement: string;
  gpaRequirement: number;
  providerProfileVo: ProviderProfile;
  scholarshipPreferences: any[];
  scholarshipMedias: ScholarshipMedia[];
  isFollow: number;
}

export interface ProviderProfile {
  id: number;
  userId: string;
  organizationName: string;
  organizationType: string;
  website: string;
  email: string;
  phone: string;
  logoUrl: string;
  bannerUrl: string;
  addressSummary: string;
  description: string;
  yearEstablished: number;
  accreditation: string;
  specialization: string;
  verified: boolean;
  country: string;
  providerContactDtos: ProviderContact[];
  isFollow: number;
}

export interface ProviderContact {
  id: number;
  providerId: number;
  contactName: string;
  roleTitle: string;
  email: string;
  phone: string;
  linkedinUrl: string;
}

export interface ScholarshipMedia {
  id: number;
  s3Key: string;
  contentType: string;
  size: number;
  folderName: string;
  fileName: string;
  isPublic: boolean;
  url: string;
}
