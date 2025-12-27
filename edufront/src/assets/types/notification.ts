declare global {
  type UserNotification = {
    id: number;
    isRead: boolean;
    referenceType: string;
    referenceId: string;
    content: string;
    slug?: string;
    createdDate: number;
  };
}

export {};
