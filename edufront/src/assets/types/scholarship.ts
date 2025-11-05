declare global {
  type ScholarshipMedia = {
    id: number;
    s3Key: string;
    contentType: string;
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
    scholarshipMedias: ScholarshipMedia[];
    isFollow: number; // Whether user is following this scholarship (0 or 1)
  };

  // API Request Types
  type ScholarshipSearchCriteria = {
    country?: string;
    university?: string;
    studyLevel?: string;
    scholarshipType?: string;
  };

  type ScholarshipSearchRequest = {
    criteria: ScholarshipSearchCriteria;
    sortBy?: string;
    sortDirection?: 'ASC' | 'DESC';
    page: number;
    size: number;
  };

  // API Response Types
  type Pageable = {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };

  type Sort = {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };

  type ScholarshipPageResponse = {
    content: Scholarship[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    numberOfElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: Sort;
    empty: boolean;
  };

  // Advanced Search API Request Types
  type ScholarshipAdvancedSearchCriteria = {
    studyLevel?: string;
    country?: string;
    university?: string;
  };

  type ScholarshipAdvancedSearchRequest = {
    criteria: ScholarshipAdvancedSearchCriteria;
    page: number;
    size: number;
    keyword?: string;
    minGpa?: number;
    maxGpa?: number;
  };

  // Advanced Search API Response Types
  type ScholarshipSearchItem = Scholarship & {
    pageNum?: number;
    pageSize?: number;
    totalPages?: number;
    totalElements?: number;
  };

  type ScholarshipSearchAggregations = {
    country?: Record<string, number>;
    studyLevel?: Record<string, number>;
  };

  type ScholarshipSearchResponse = {
    availableSlots: number;
    scholarship: ScholarshipSearchItem[];
    pageNum: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    aggregations?: ScholarshipSearchAggregations;
    isFollow: number;
  };
}

export {};
