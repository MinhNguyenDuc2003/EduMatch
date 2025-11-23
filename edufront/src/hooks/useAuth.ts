'use client';

import { useAuthenticatedQuery } from '@/state/apiAuth';

export const useAuth = () => {
  const { data, isLoading, isError, error, refetch } = useAuthenticatedQuery();

  return {
    // User data
    user: data?.customer ?? null,

    // Authentication state
    isAuthenticated: data?.isAuthenticated ?? false,
    isProvider: data?.isProvider ?? false,
    subscriptions: data?.subscriptions ?? [],
    // Loading and error states
    isLoading,
    isError,
    error,

    // Helper methods
    refetch,
  };
};
