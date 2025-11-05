declare global {
  type ScholarshipMedia = {
    id?: number;
    s3Key?: string;
    contentType?: string;
    size?: number;
    folderName?: string;
    fileName?: string;
    isPublic?: boolean;
    url?: string;
  };

  type IScholarshipList = {
    id?: number;
    providerId?: number;
    title?: string;
    slug?: string;
    shortDescription?: string;
    description?: string;
    requirements?: string;
    benefits?: string;
    fields?: string;
    country?: string;
    university?: string;
    studyLevel?: string;
    scholarshipType?: string;
    fundingAmount?: string;
    startDate?: number; // Unix timestamp (ms)
    endDate?: number; // Unix timestamp (ms)
    availableSlots?: number;
    languageRequirement?: string;
    gpaRequirement?: number;
    scholarshipMedias?: ScholarshipMedia[];
  };

  type ScholarshipResponse = {
    data?: {
      content?: IScholarshipList[];
      totalElements?: number;
      totalPages?: number;
      number?: number;
      size?: number;
    };
    success?: boolean;
    status?: number;
    ts?: number;
  };
}

export {};
