declare global {
  type ScholarshipMedia = {
    id: number;
    s3Key: string;
    contentType: string;
    size: number;
    folderName: string;
    fileName: string;
    isPublic: boolean;
    thumbnail?: string;
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
    startDate: number; // Timestamp (number)
    endDate: number; // Timestamp (number)
    availableSlots: number;
    languageRequirement: string;
    gpaRequirement: number;
    isDeleted?: boolean;
    providerProfileVo: ProviderProfile;
    scholarshipPreferences?: ScholarshipPreference[];
    scholarshipMedias?: ScholarshipMedia[];
    isFollow: number;
  };

  type ScholarshipSearchCriteria = {
    country?: string;
    university?: string;
    studyLevel?: string;
    scholarshipType?: string;
  };

  type ScholarshipPageRequest = {
    criteria: ScholarshipSearchCriteria;
    sortBy?: string;
    sortDirection?: 'ASC' | 'DESC';
    page: number;
    size: number;
  };

  type ScholarshipSearchRequest = {
    criteria: Pick<ScholarshipSearchCriteria, 'country' | 'university' | 'studyLevel'>;
    page: number;
    size: number;
    keyword?: string;
    minGpa?: number;
    maxGpa?: number;
  };

  type ScholarshipPageResponse = {
    content: Scholarship[];
  };

  type ScholarshipSearchAggregations = {
    country?: Record<string, number>;
    studyLevel?: Record<string, number>;
    [key: string]: Record<string, number> | undefined;
  };

  type ScholarshipSearchResponse = {
    scholarship: Scholarship[];
    totalElements: number;
    totalPages: number;
    aggregations?: ScholarshipSearchAggregations;
  };

  // Search Filters (for UI state management)
  type FilterState = {
    keyword: string;
    country: string;
    studyLevel: string;
    university: string;
    minGpa: number;
    maxGpa: number;
    page: number;
    size: number;
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
