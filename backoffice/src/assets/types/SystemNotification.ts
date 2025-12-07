export interface ISystemNotification {
  id: number;
  isRead: boolean;
  referenceType: string; // Có thể dùng union nếu có danh sách cố định, ví dụ: "SYSTEM" | "USER" | ...
  content: string;
  isAdmin: boolean;
  createdDate: number; // timestamp dạng millis
}
