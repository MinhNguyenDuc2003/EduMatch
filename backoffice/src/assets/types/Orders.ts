export interface IOrderList  {
  id: number;
  subscriptionId: number;
  userId: string;
  amount: number;
  currency: string;
  paymentMethod: "CARD" | "PAYPAL" | "BANK_TRANSFER" | string; // nếu có nhiều phương thức khác
  transactionId: string;
  status: "PAID" | "PENDING" | "FAILED" | string;
  paidAt: number; // timestamp
};
