'use client';
import Header from '@/pattern/share/Header';
import { useGetStatisticsQuery } from '@/state/apiProvider';
import React from 'react';
import { StatsCard } from './components/StatsCard';
import { BookText, Check, Clock, Eye, X } from 'lucide-react';

const DashboardPage = () => {
  const { data: statistics } = useGetStatisticsQuery();

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <Header title="Dashboard" subtitle="Welcome back! Here's what's happening today." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          title="Total Scholarships"
          value={statistics?.totalScholarship || 0}
          color="from-blue-500 to-blue-600"
          icon={BookText}
        />
        <StatsCard
          title="Total Pending Applications"
          value={statistics?.totalApplicationByStatus?.Pending || 0}
          color="from-[#38a696] to-[#52c0b0]"
          icon={Clock}
        />
        <StatsCard
          title="Total Approved Applications"
          value={statistics?.totalApplicationByStatus?.Approved || 0}
          color="from-green-500 to-green-600"
          icon={Check}
        />
        <StatsCard
          title="Total Rejected Applications"
          value={statistics?.totalApplicationByStatus?.Rejected || 0}
          color="from-red-500 to-red-600"
          icon={X}
        />
        <StatsCard
          title="Total Views"
          value={statistics?.totalViews || 0}
          color="from-yellow-500 to-yellow-600"
          icon={Eye}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
