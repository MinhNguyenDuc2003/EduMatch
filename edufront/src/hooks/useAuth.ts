'use client';

import { useAuthenticatedQuery, useLogoutMutation } from '@/state/apiAuth';
import { toast } from 'sonner';

export const useAuth = () => {
  const { data, isLoading, isError, error, refetch } = useAuthenticatedQuery();

  const handleLogout = () => {
    window.location.href = 'http://159.89.200.244/logout';
  };

  return {
    // User data
    user: data?.customer ?? null,

    // Authentication state
    isAuthenticated: data?.isAuthenticated ?? false,
    isProvider: data?.isProvider ?? false,
    isApplicant: data?.isApplicant ?? false,
    subscriptions: data?.subscriptions ?? [],
    // Loading and error states
    isLoading,
    isError,
    error,

    handleLogout,

    // Helper methods
    refetch,
  };
};
