declare global {
  type Payment = {
    createdDate: string;
    id: number;
    subscriptionId: number;
    userId: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    transactionId: string;
    status: string;
    paidAt: string;
    subscription: Subscription & {
      customer: Customer;
    };
    customer: Customer;
  };
}

export {};
