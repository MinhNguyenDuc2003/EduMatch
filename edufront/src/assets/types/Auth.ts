declare global {
  type Customer = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };

  type AuthResponse = {
    customer?: Customer;
    isAuthenticated: boolean;
    isProvider?: boolean;
    isApplicant?: boolean;
    subscriptions?: Subscription[];
  };
}
export {};
