'use client';

import { SidebarProvider } from '@/lib/cus/sidebar';
import ProviderNavbar from '@/pattern/core/ProviderNavbar';
import ProviderSidebar from '@/pattern/core/ProviderSidebar';
import ProtectedRoute from '@/pattern/core/ProtectedRoute';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute requireProvider={true}>
      <SidebarProvider>
        <div className="min-h-screen w-full bg-white flex">
          <ProviderSidebar />
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-grow min-h-screen transition-all duration-500 ease-in-out overflow-y-auto">
              <ProviderNavbar />
              <main>{children}</main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default Layout;
