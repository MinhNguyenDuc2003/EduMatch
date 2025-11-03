'use client';

import { Button } from '@/lib/cus/button';
import { SidebarTrigger } from '@/lib/cus/sidebar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/lib/cus/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/lib/cus/dropdown-menu';
import { Bell } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

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

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'New Application Received',
      message: 'John Doe applied for Computer Science Scholarship',
      time: '5 min ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Scholarship Approved',
      message: 'Your Engineering Excellence Award has been approved',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Application Review Due',
      message: '3 applications need your review this week',
      time: '2 hours ago',
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

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
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative w-9 h-9 text-gray-600 shadow-none hover:text-gray-900 hover:bg-gray-100"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span className="font-semibold">Notifications</span>
                {unreadCount > 0 && (
                  <span className="text-xs font-normal text-primary-brand">{unreadCount} new</span>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 flex flex-col gap-1 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={cn(
                      'flex flex-col items-start gap-1 p-3 cursor-pointer',
                      notification.unread && 'bg-primary-light'
                    )}
                  >
                    <div className="flex items-start justify-between w-full">
                      <p className="font-semibold text-sm text-gray-900">{notification.title}</p>
                      {notification.unread && (
                        <span className="w-2 h-2 bg-primary-brand rounded-full mt-1"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center justify-center text-primary-brand font-medium cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default ProviderNavbar;
