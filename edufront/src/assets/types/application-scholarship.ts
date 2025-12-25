declare global {
  type ApplicationScholarship = {
    id: number;
    scholarshipId: number;
    applicationId: number;
    scholarshipVo: Scholarship;
    applicationVo: Application;
    status: string;
    appliedAt?: number;
    reviewedAt?: number;
    note?: string;
    score?: number;
    llmScore?: ApplicationScholarshipLlmScore;
    cosineScore?: ApplicationScholarshipCosineScore;
    createdDate: number;
  };

  type UpdateApplicationStatusRequest = {
    id: number;
    scholarshipId: number;
    applicationId: number;
    reviewedAt: number;
    status: string;
    note?: string;
  };

  type ApplicationScholarshipLlmScore = {
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

  type ApplicationScholarshipCosineScore = {
    score: number;
    major: number;
    skills: number;
    research: number;
    soft_score: number;
  };
}

export {};
