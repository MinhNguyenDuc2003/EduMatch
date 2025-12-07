'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '../share/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /**
   * Redirect path khi chưa authenticated. Default: '/home'
   */
  redirectTo?: string;
  /**
   * Yêu cầu user phải là provider. Default: false
   */
  requireProvider?: boolean;
  /**
   * Yêu cầu user phải là applicant. Default: false
   */
  requireApplicant?: boolean;
  /**
   * Custom loading component
   */
  loadingComponent?: React.ReactNode;
}

/**
 * ProtectedRoute component - Bảo vệ các routes cần authentication
 *
 * @example
 * // Bảo vệ route cho user đã đăng nhập
 * <ProtectedRoute>
 *   <YourComponent />
 * </ProtectedRoute>
 *
 * @example
 * // Bảo vệ route cho provider
 * <ProtectedRoute requireProvider={true}>
 *   <ProviderComponent />
 * </ProtectedRoute>
 *
 * @example
 * // Bảo vệ route cho applicant
 * <ProtectedRoute requireApplicant={true}>
 *   <ApplicantComponent />
 * </ProtectedRoute>
 */
export default function ProtectedRoute({
  children,
  redirectTo = '/home',
  requireProvider = false,
  requireApplicant = false,
  loadingComponent,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, isProvider, isApplicant, subscriptions } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Chờ loading xong trước khi check
    if (isLoading) return;

    // Redirect nếu chưa authenticated
    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Redirect nếu cần provider nhưng user không phải provider
    if (
      requireProvider &&
      !isProvider &&
      !subscriptions.some((subscription) => subscription.userType === 'PROVIDER')
    ) {
      router.push(redirectTo);
      return;
    }

    if (
      requireProvider &&
      isProvider &&
      !subscriptions.some((subscription) => subscription.userType === 'PROVIDER')
    ) {
      router.push('/subscriptions?type=PROVIDER');
      return;
    }

    // Redirect nếu cần applicant nhưng user không phải applicant
    if (requireApplicant && !isApplicant) {
      router.push(redirectTo);
      return;
    }
  }, [
    isAuthenticated,
    isLoading,
    isProvider,
    isApplicant,
    requireProvider,
    requireApplicant,
    router,
    redirectTo,
  ]);

  // Hiển thị loading state
  if (isLoading) {
    return loadingComponent || <Loading />;
  }

  // Không render children nếu chưa authenticated hoặc không đủ điều kiện
  if (
    !isAuthenticated ||
    (requireProvider &&
      !isProvider &&
      !subscriptions.some((subscription) => subscription.userType === 'PROVIDER')) ||
    (requireApplicant && !isApplicant)
  ) {
    return null;
  }

  return <>{children}</>;
}
