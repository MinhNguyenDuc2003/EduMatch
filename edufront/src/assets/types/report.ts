declare global {
  type ReportType = 'SCHOLARSHIP' | 'PROVIDER' | 'SYSTEM' | 'PROFILE';

  type FormReport = {
    title: string;
    comment: string;
    categoryId: number;
  };

  type ReportCategory = {
    id: number;
    name: string;
    description: string;
    type: ReportType;
  };
}
export {};
