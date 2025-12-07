'use client';

import { useGetSubscriptionPlanByIdQuery } from '@/state/apiAuth';
import { useSearchParams } from 'next/navigation';

export const useCurrentSubscription = () => {
  const searchParams = useSearchParams();
  const subscriptionPlanId = searchParams.get('id') ?? '';
  const { data: subscriptionPlan, ...rest } = useGetSubscriptionPlanByIdQuery(subscriptionPlanId);

  return { subscriptionPlan, subscriptionPlanId, ...rest };
};
