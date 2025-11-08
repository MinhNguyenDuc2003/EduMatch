export type ISubcriptionList = {
  id?: number;
  userId?: string;
  userType?: string;
  startDate?: number;
  endDate?: number;
  status?: string;
  autoRenew?: boolean;
  plan?: IPlan;
};
export interface IPlan {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  durationDays?: number;
  targetType?: string;
  features?: string;
}