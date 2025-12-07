declare global {
  type SubscriptionPlan = {
    id: number;
    name: string;
    description: string;
    price: number;
    currency: string;
    durationDays: number;
    targetType: "APPLICANT";
    features: string[];
  };
}

export {};
