'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/lib/cus/sidebar';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookText,
  FileText,
  Users,
  Settings,
  ChevronRight,
  User,
  HelpCircle,
  Newspaper,
  Home,
  ArrowBigUp,
  Heart,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/lib/cus/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/lib/cus/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';

const ProviderSidebar = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const { state } = useSidebar();

  const t = useTranslations('providerSidebar');

  const navLinks = [
    {
      icon: LayoutDashboard,
      label: t('dashboard'),
      href: '/provider/dashboard',
    },
    {
      icon: BookText,
      label: t('scholarships'),
      href: '/provider/scholarships',
    },
    {
      icon: FileText,
      label: t('applications'),
      href: '/provider/applications',
    },
    {
      icon: Newspaper,
      label: t('news'),
      href: '/provider/news',
    },
    {
      icon: Users,
      label: t('students'),
      href: '/provider/students',
    },
    {
      icon: Heart,
      label: t('favourite'),
      href: '/provider/favourite',
    },
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      {/* Header with Logo */}
      <SidebarHeader className="border-b border-gray-100 p-6">
        <div className="flex items-center gap-3 px-2">
          {/* <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-brand shadow-md group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8"> */}
          <Image
            src={'https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz85HjSO62tcmI7ElP8Ygn01Oa3ze6iFwADrsH'}
            alt="logo"
            width={50}
            height={30}
            unoptimized
          />
          {/* </div> */}
          <div className="flex items-center gap-0.5 group-data-[collapsible=icon]:hidden">
            <span className="text-xl font-semibold text-gray-900">Edu</span>
            <span className="text-xl font-bold bg-primary-brand bg-clip-text text-transparent">
              Match
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent className="px-3 py-4">
        <SidebarMenu className="gap-1.5">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    'group relative h-11 rounded-lg transition-all duration-200',
                    active
                      ? 'bg-primary-brand text-white shadow-md hover:bg-primary-brand/90 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  tooltip={state === 'collapsed' ? link.label : undefined}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 px-3 w-full"
                    scroll={false}
                  >
                    <link.icon
                      className={cn(
                        'w-5 h-5 transition-transform duration-200',
                        active ? 'text-white scale-110' : 'text-gray-500 group-hover:text-gray-700'
                      )}
                    />
                    <span className="font-medium text-sm flex-1 group-data-[collapsible=icon]:hidden">
                      {link.label}
                    </span>
                    {active && (
                      <ChevronRight className="w-4 h-4 text-white group-data-[collapsible=icon]:hidden" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer with User Profile Dropdown */}
      <SidebarFooter className="border-t border-gray-100 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group-data-[collapsible=icon]:justify-center">
              <Avatar className="w-9 h-9 ring-2 ring-[#52c0b0]/20">
                <AvatarImage src="https://github.com/shadcn.png" alt="Provider" />
                <AvatarFallback className="bg-primary-brand text-white">
                  {user?.firstName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>

              <ChevronRight className="w-4 h-4 text-gray-400 group-data-[collapsible=icon]:hidden" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="right" className="w-56 mb-2">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/provider/profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{t('profile')}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/provider/settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>{t('settings')}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/subscriptions?type=PROVIDER" className="flex items-center gap-2">
                <ArrowBigUp className="w-4 h-4" />
                <span>{t('extendSubscription')}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/home" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>{t('backToHome')}</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ProviderSidebar;
