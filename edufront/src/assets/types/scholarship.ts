declare global {
  type ScholarshipMedia = {
    id: number;
    s3Key: string;
    size: number;
    folderName: string;
    fileName: string;
    isPublic: boolean;
    url: string;
  };

  type ScholarshipPreference = {
    id: number;
    scholarshipId: number;
    type: string;
    value: string;
    weight: number;
    note: string;
  };

  type Scholarship = {
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
    providerProfileVo?: ProviderProfile;
    scholarshipPreferences?: ScholarshipPreference[];
    scholarshipMedias?: ScholarshipMedia[];
    organizationLogoUrl?: string; // Organization/company logo URL
    isTracking?: boolean; // Whether user is tracking/following this scholarship
  };

  type ApiGetScholarshipResponse = {
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
  };
}

export {};
