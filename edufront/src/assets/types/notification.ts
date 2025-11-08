declare global {
  type UserNotification = {
    id?: number;
    userId: string;
    isRead: boolean;
    referenceType: string;
    referenceId: string;
    topic: string;
    title: string;
    content: string;
  };
}

export {};
