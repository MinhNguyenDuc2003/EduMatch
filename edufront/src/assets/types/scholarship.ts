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
    type?: string;
    field?: string;
    weight: number;
  };

  type Scholarship = {
    id: number;
    providerId: number;
    title: string;
    slug: string;
    shortDescription: string; // Có liên quan đến kinh nghiệm, mục tiêu nghề nghiệp, thành tích và các hoạt động ngoại khóa của học sinh
    description: string; // Có liên quan đến kinh nghiệm, mục tiêu nghề nghiệp, thành tích và các hoạt động ngoại khóa của học sinh
    requirements: string; // Yêu cầu về kỹ năng của người dùng
    benefits: string; // Có liên quan đến kinh nghiệm, mục tiêu nghề nghiệp, thành tích và các hoạt động ngoại khóa của học sinh
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
    requiredMajor: string;
    restrictedNationalities: string;
    minAge: number;
    maxAge: number;
    genderRequirement: string;
    requiredSatScore: number;
    requiredActScore: number;
    requiredGreScore: number;
    requiredToeflScore: number;
    requiredIeltsScore: number;
    requiredGmatScore: number;
    requiredWorkExperienceYears: number;
    requiredPublicationCount: number;
    requiredAcademicAwards: string;
    requiredClassRankPercentile: number;
    status: string;
    isDeleted?: boolean;
    providerProfileVo: ProviderProfile;
    scholarshipPreferences?: ScholarshipPreference[];
    scholarshipMedias?: ScholarshipMedia[];
    isFollow: number;
    views: number;
    score?: number;
    createdDate?: number;
    caseStudyVos?: CaseStudy[];
    llmScore?: ScholarshipLLMScore;
    cosineScore?: ScholarshipCosineScore;
  };

  type ScholarshipLLMScore = {
    motivation_score: number;
    statement_score: number;
    career_score: number;
    achievement_score: number;
    extracurricular_score: number;
    overall_soft_score: number;
    experience_score: number;
    education_score: number;
    intentions_score: number;
  };

  type ScholarshipCosineScore = {
    major: number;
    skills: number;
    research: number;
    soft_score: number;
  };

  type SearchScholarshipsByUniversityResponse = {
    id: number;
    university: string;
    availableSlots: number;
  };

  type ScholarshipSearchCriteria = {
    country?: string;
    university?: string;
    studyLevel?: string;
    scholarshipType?: string;
    fields?: string;
  };

  type ScholarshipPageRequest = {
    criteria: ScholarshipSearchCriteria;
    sortBy?: string;
    sortDirection?: 'ASC' | 'DESC';
    page: number;
    size: number;
  };

  type ScholarshipSearchRequest = {
    criteria: ScholarshipSearchCriteria;
    page: number;
    size: number;
    keyword?: string;
    minGpa?: number;
    maxGpa?: number;
  };

  type ScholarshipSearchAggregations = {
    country?: Record<string, number>;
    studyLevel?: Record<string, number>;
    [key: string]: Record<string, number> | undefined;
  };

  type ScholarshipSearchResponse = {
    scholarship: Scholarship[];
    aggregations?: ScholarshipSearchAggregations;
  };

  // Search Filters (for UI state management)
  type FilterState = {
    keyword: string;
    country: string;
    studyLevel: string;
    scholarshipType: string;
    university: string;
    fields: string;
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

  type ScholarshipAnalysisRecommendation = {
    scholarship_name: string;
    match_reasons: string[];
    student_strengths: string[];
    improvement_areas: string[];
    application_tips: string[];
  };

  type ScholarshipAnalysis = {
    recommendations: ScholarshipAnalysisRecommendation[];
    overall_strategy: string;
    timeline: string[];
  };

  // AI Comparison Response Types
  type ScholarshipComparisonBestMatch = {
    scholarship_name: string;
    reasons: string[];
  };

  type ScholarshipComparisonAdvantage = {
    scholarship_name: string;
    advantages: string[];
  };

  type ScholarshipComparisonTradeoff = {
    factor: string;
    comparison: string;
  };

  type ScholarshipComparisonRecommendation = {
    priority_order: string[];
    reasoning: string;
  };

  type ScholarshipComparisonStrategy = {
    approach: string;
    timeline_tips: string[];
  };

  type ScholarshipComparisonAnalysis = {
    best_overall_match: ScholarshipComparisonBestMatch;
    unique_advantages: ScholarshipComparisonAdvantage[];
    key_tradeoffs: ScholarshipComparisonTradeoff[];
    strategic_recommendation: ScholarshipComparisonRecommendation;
    application_strategy: ScholarshipComparisonStrategy;
  };

  type ScholarshipComparisonResponse = {
    success: boolean;
    analysis: ScholarshipComparisonAnalysis;
  };

  type CaseStudy = {
    id?: number;
    scholarshipId?: number;
    userId?: string;
    title?: string;
    content?: string;
    verified?: boolean;
    profileVo?: ApplicantProfile;
    medias?: CaseStudyMedia[];
  };

  type CaseStudyMedia = {
    id?: number;
    s3Key?: string;
    contentType?: string;
    size?: number;
    folderName?: string;
    fileName?: string;
    isPublic?: boolean;
    thumbnail?: string;
    url?: string;
  };

  type CaseStudyApiRequest = {
    scholarshipId: number;
    title: string;
    content: FormData;
    images?: File[];
  };
}

export {};
