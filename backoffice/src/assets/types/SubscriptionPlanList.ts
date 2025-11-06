export interface ISubscriptionPlanList {
  ts?: number;
  status?: number;
  success?: boolean;
  data?: Array<IData>;
  fields?: Array<unknown>;
}
export type IData = {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  durationDays?: number;
  targetType?: string;
  features?: string;
};