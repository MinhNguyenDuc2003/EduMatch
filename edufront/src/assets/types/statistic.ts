declare global {
  type Statistics = {
    totalScholarships: number;
    totalViews: number;
    totalApplies: number;
    averageApplyRate: number; // Tỉ lệ apply trung bình so với total views
    approveRate: number; // Tỉ lệ approve so với total applies
    rejectRate: number; // Tỉ lệ reject so với total applies
    pendingRate: number; // Tỉ lệ pending so với total applies
    viewButNoApplyRate: number; // Tỉ lệ view nhưng không apply so với total views
    top5ByView: string[]; // Top 5 scholarships by view
    top5ByApply: string[]; // Top 5 scholarships by apply
  };
}

export {};
