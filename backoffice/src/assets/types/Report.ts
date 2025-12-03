export interface IReportList {
  id: number;
  title: string;
  comment: string;
  userId: string;
  category: {
    id: number;
    name: string;
    description: string;
    type: 'PROFILE' | string;
  };
  isRead: boolean;
  status: 'PENDING' | string;
  response: string;
}
