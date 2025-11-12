import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useAuth } from './useAuth';

export const useCheckoutNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();

  const subcriptionPlanId = searchParams.get('id') ?? '';
  const checkoutStep = parseInt(searchParams.get('step') ?? '1', 10);

  const navigateToStep = useCallback(
    (step: number) => {
      const newStep = Math.min(Math.max(1, step), 3);

      router.push(`/checkout?step=${newStep}&id=${subcriptionPlanId}`, {
        scroll: false,
      });
    },
    [subcriptionPlanId, isAuthenticated, router]
  );

  return { checkoutStep, navigateToStep };
};
