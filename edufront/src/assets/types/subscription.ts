declare global {
  type Subscription = {
    id: number;
    name: string;
    description: string;
    price: number;
    currency: string;
    durationDays: number;
    targetType: 'PROVIDER' | 'APPLICANT';
    features: string;
  };
}

export {};
