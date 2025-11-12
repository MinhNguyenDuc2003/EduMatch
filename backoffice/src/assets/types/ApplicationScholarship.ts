export interface ApplicationAttribute {
  [key: string]: any;
}

export interface ApplicationVo {
  id: number;
  userId: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  nationality: string;
  educationLevel: string;
  schoolName: string;
  major: string;
  gpa: number;
  graduationYear: string;
  skills: string;
  achievements: string;
  extracurricular: string;
  motivation: string;
  personalStatement: string;
  applicationAttributes: ApplicationAttribute[];
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

export interface ProviderContactDto {
  id: number;
  providerId: number;
  contactName: string;
  roleTitle: string;
  email: string;
  phone: string;
  linkedinUrl: string;
}

export interface ProviderProfileVo {
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
  providerContactDtos: ProviderContactDto[];
  isFollow: number;
}

export interface ScholarshipVo {
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
  providerProfileVo: ProviderProfileVo;
  scholarshipPreferences: any[];
  scholarshipMedias: ScholarshipMedia[];
  isFollow: number;
}

export interface IApplicationItem {
  id: number;
  applicationId: number;
  scholarshipId: number;
  status: string;
  applicationVo: ApplicationVo;
  scholarshipVo: ScholarshipVo;
}
