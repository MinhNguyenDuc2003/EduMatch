'use client';

import { useAuthenticatedQuery, useLogoutMutation } from '@/state/apiAuth';
import { toast } from 'sonner';
import { useScholarshipCompareStore } from '@/hooks/useScholarshipCompare';

export const useAuth = () => {
  const { data, isLoading, isError, error, refetch } = useAuthenticatedQuery();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { clearStorage } = useScholarshipCompareStore();

  const handleLogout = async () => {
    await logout()
      .unwrap()
      .then(() => {
        clearStorage();
        toast.success('Logged out successfully');
      });
  };

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

    handleLogout,

    // Helper methods
    refetch,
  };
};
