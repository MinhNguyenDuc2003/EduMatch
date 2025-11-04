// Type định nghĩa theo API response
export interface ScholarshipMedia {
  id: number;
  s3Key: string;
  size: number;
  folderName: string;
  fileName: string;
  isPublic: boolean;
  url: string;
}

export interface Scholarship {
  id: number;
  providerId?: number;
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
  scholarshipMedias?: ScholarshipMedia[];
}

export interface ApiResponse {
  content: Scholarship[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
  };
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

