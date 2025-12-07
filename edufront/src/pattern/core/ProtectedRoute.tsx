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
 */
export default function ProtectedRoute({
  children,
  redirectTo = '/home',
  requireProvider = false,
  loadingComponent,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, isProvider, subscriptions } = useAuth();
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
  }, [isAuthenticated, isLoading, isProvider, requireProvider, router, redirectTo]);

  // Hiển thị loading state
  if (isLoading) {
    return loadingComponent || <Loading />;
  }

  // Không render children nếu chưa authenticated hoặc không đủ điều kiện
  if (
    !isAuthenticated ||
    (requireProvider &&
      !isProvider &&
      !subscriptions.some((subscription) => subscription.userType === 'PROVIDER'))
  ) {
    return null;
  }

  return <>{children}</>;
}
