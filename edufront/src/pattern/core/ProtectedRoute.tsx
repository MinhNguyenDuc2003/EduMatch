'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

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
  const { isAuthenticated, isLoading, isProvider } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Chờ loading xong trước khi check
    if (isLoading) return;

    // Redirect nếu chưa authenticated
    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Redirect nếu cần provider nhưng user không phải provider
    if (requireProvider && !isProvider) {
      router.push(redirectTo);
      return;
    }
  }, [isAuthenticated, isLoading, isProvider, requireProvider, router, redirectTo]);

  // Hiển thị loading state
  if (isLoading) {
    return (
      loadingComponent || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )
    );
  }

  // Không render children nếu chưa authenticated hoặc không đủ điều kiện
  if (!isAuthenticated || (requireProvider && !isProvider)) {
    return null;
  }

  return <>{children}</>;
}
