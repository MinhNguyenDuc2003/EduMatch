declare global {
  type Statistics = {
    totalScholarship: number;
    totalApplicationByStatus: {
      [key: string]: number;
    };
    totalViews: number;
  };
}

export {};
