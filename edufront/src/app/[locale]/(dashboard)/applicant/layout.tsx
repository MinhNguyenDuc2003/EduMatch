'use client';

import Footer from '@/pattern/core/Footer';
import Header from '@/pattern/core/Navbar';
import ProtectedRoute from '@/pattern/core/ProtectedRoute';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <div className="w-full min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 ">{children}</main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
