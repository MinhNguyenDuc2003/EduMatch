declare global {
  type ApplicationScholarship = {
    id: number;
    scholarshipId: number;
    applicantId: number;
    scholarshipVo?: Scholarship;
    applicationVo?: Application;
    status: string;
    appliedAt?: number;
    note?: string;
  };
}

export {};
