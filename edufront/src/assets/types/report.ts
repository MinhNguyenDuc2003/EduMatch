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

  type MyReport = {
    id: number;
    title?: string;
    comment?: string;
    userId?: string;
    category?: ReportCategory;
    isRead?: boolean;
    status?: string;
    response?: string;
  };
}
export {};
