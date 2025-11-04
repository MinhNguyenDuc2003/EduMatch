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
    startDate: number; // timestamp
    endDate: number; // timestamp
    availableSlots: number;
    languageRequirement: string;
    gpaRequirement: number;
    scholarshipMedias?: ScholarshipMedia[];
    organizationLogoUrl?: string; // Organization/company logo URL
    isTracking?: boolean; // Whether user is tracking/following this scholarship
  };
}

export {};
