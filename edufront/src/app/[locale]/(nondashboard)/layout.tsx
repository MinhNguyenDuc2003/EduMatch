import Footer from '@/pattern/core/Footer';
import Header from '@/pattern/core/Navbar';
import SelectedScholarshipCompare from '@/pattern/share/SelectedScholarshipCompare';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <main className="flex-1 ">{children}</main>
      <Footer />
      <SelectedScholarshipCompare />
    </div>
  );
};

export default Layout;
