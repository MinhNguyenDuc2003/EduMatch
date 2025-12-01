declare global {
  type Subscription = {
    id: number;
    userId: string;
    userType: "PROVIDER" | "APPLICANT";
    startDate: number;
    endDate: number;
    status: string;
    plan: SubscriptionPlan;
  };
}

export {};
