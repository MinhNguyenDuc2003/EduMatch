'use client';

import { SidebarTrigger } from '@/lib/cus/sidebar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/lib/cus/breadcrumb';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Notifications from '../share/Notifications';

const ProviderNavbar = () => {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter((path) => path);
    const breadcrumbs = paths.map((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/');
      const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      return { href, label };
    });
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="sticky top-0 w-full h-16 px-4 sm:px-6 lg:px-8 z-20 flex items-center border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="flex justify-between items-center w-full gap-4">
        {/* Left Section - Sidebar Trigger & Breadcrumbs */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <SidebarTrigger className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 -ml-2 shadow-none" />

          <div className="hidden md:block">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={breadcrumb.href}>
                    <BreadcrumbItem>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage className="font-semibold text-gray-900">
                          {breadcrumb.label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link
                            href={breadcrumb.href}
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            {breadcrumb.label}
                          </Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Right Section - Actions */}
        <Notifications />
      </div>
    </nav>
  );
};

export default ProviderNavbar;
