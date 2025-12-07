'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from 'common/services/components/ui/sidebar';
import {
  Activity,
  AlertCircle,
  Bell,
  BookOpen,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Package,
  PanelLeft,
  ShoppingCart,
  UserCircle,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from 'src/utils/cn';

const AppSidebar = () => {
  const pathname = usePathname();

  const navLinks = {
    Admin: [
      { icon: Activity, label: 'Dashboard', href: '/backoffice/dashboard' },
      { icon: Users, label: 'Users', href: '/backoffice/user' },
      { icon: UserCircle, label: 'Profile', href: '/backoffice/profile' },
      { icon: BookOpen, label: 'Scholarship', href: '/backoffice/scholarship' },
      { icon: FileText, label: 'Application Scholarship', href: '/backoffice/applicationScholarship' },
      { icon: ShoppingCart, label: 'Orders', href: '/backoffice/order' },
      { icon: Package, label: 'Subscriptions', href: '/backoffice/subscriptions' },
      { icon: CreditCard, label: 'Subscription Plan', href: '/backoffice/subscriptionPlan' },
      { icon: MessageCircle, label: 'News', href: '/backoffice/news' },
      { icon: Bell, label: 'Report & Feedback', href: '/backoffice/reportFeedback' },
      { icon: AlertCircle, label: 'System Notification', href: '/backoffice/systemNotification' },
    ]

  };

  return (
    <Sidebar
      collapsible="icon"
      className="bg-white border-r border-gray-200 shadow-md transition-all duration-500"
    >
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu className="mt-4">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="group hover:bg-gray-100 transition-all duration-300"
            >
              <div className="flex justify-between items-center gap-5 w-full pl-3 pr-1">
                <div className="flex items-center gap-4">
                  <LayoutDashboard
                    width={24}
                    height={24}
                    className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
                  />
                  <p className="text-lg font-semibold text-gray-800 group-data-[collapsible=icon]:hidden">
                    Dashboard
                  </p>
                </div>
                <PanelLeft className="text-gray-400 w-5 h-5 group-data-[collapsible=icon]:hidden" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarMenu className="mt-4 space-y-1 p-3">
          {navLinks.Admin.map((link) => {
            const isActive = pathname.includes(link.href);
            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  size="lg"
                  className={cn(
                    'relative flex items-center gap-4 p-4 rounded-lg mx-3 transition-all duration-300',
                    'text-gray-600 hover:bg-gray-100 hover:text-blue-600',
                    isActive && 'bg-blue-600 text-white shadow-sm shadow-blue-400'
                  )}
                >
                  <Link href={link.href} scroll={false}>
                    <link.icon
                      className={cn(
                        'w-5 h-5 transition-transform duration-200',
                        isActive ? 'text-black scale-110' : 'text-black group-hover:text-black'
                      )}
                    />
                    <span className="group-data-[collapsible=icon]:hidden">{link.label}</span>
                    {isActive && (
                      <span className="absolute right-0 top-0 h-full w-[4px] bg-blue-400 rounded-l-md" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="hover:bg-gray-100 p-4 transition-all duration-300"
            >
              <button className="flex items-center text-gray-600 hover:text-blue-600">
                <LogOut className="mr-2 h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">Sign out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
