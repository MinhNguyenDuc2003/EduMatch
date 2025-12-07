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
    createdDate?: number;
  };
}

export {};
