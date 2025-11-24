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
  };

  type UpdateApplicationStatusRequest = {
    id: number;
    scholarshipId: number;
    applicationId: number;
    reviewedAt: number;
    status: string;
    note?: string;
  };
}

export {};
