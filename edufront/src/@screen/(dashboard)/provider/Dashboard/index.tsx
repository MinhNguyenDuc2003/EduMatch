'use client';
import Header from '@/pattern/share/Header';
import {
  useGetAllApplicationsQuery,
  useGetStatisticsQuery,
  useGetTopViewedScholarshipsQuery,
} from '@/state/apiProvider';
import React from 'react';
import { StatsCard } from './components/StatsCard';
import { BookText, Check, Clock, Eye, X, TrendingUp, FileText } from 'lucide-react';
import {
  ScholarshipCard,
  ScholarshipCardSkeleton,
} from '@/@screen/(dashboard)/provider/ProviderScholaship/components/ScholarshipCard';
import { useRouter } from 'next/navigation';
import { Button } from '@/lib/cus/button';
import {
  getStatusColor,
  formatStatus,
  formatAppliedDate,
} from '@/@screen/(dashboard)/provider/Applications/utils/applicationUtils';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const DashboardPage = () => {
  const router = useRouter();
  const t = useTranslations('providerApplications');
  const { data: statistics, isLoading: isLoadingStats } = useGetStatisticsQuery();
  const { data: topViewedScholarships, isLoading: isLoadingScholarships } =
    useGetTopViewedScholarshipsQuery();
  const { data: allApplications, isLoading: isLoadingApplications } = useGetAllApplicationsQuery();

  // Get recent applications (limit to 10)
  const recentApplications = allApplications?.slice(0, 10) || [];

  const handleViewScholarship = (id: number) => {
    router.push(`/provider/scholarships/${id}`);
  };

  const handleViewApplication = (application: ApplicationScholarship) => {
    router.push(`/provider/applications?scholarshipId=${application.scholarshipId}`);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <Header title="Dashboard" subtitle="Welcome back! Here's what's happening today." />

      {/* Statistics Cards */}
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

      {/* Top Viewed Scholarships Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Top Viewed Scholarships</h2>
              <p className="text-sm text-gray-500">Most popular scholarships this month</p>
            </div>
          </div>
          {topViewedScholarships && topViewedScholarships.length > 0 && (
            <Link href="/provider/scholarships">
              <Button className="bg-primary-brand text-white hover:bg-primary-brand/90 shadow-sm">
                View All
              </Button>
            </Link>
          )}
        </div>

        {isLoadingScholarships ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <ScholarshipCardSkeleton key={index} variant="small" className="bg-white" />
            ))}
          </div>
        ) : topViewedScholarships && topViewedScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topViewedScholarships.slice(0, 6).map((scholarship) => (
              <div
                key={scholarship.id}
                onClick={() => handleViewScholarship(scholarship.id)}
                className="cursor-pointer"
              >
                <ScholarshipCard
                  scholarship={scholarship}
                  variant="small"
                  className="h-full hover:shadow-lg transition-shadow bg-white"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <BookText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-lg">No scholarships found</p>
            <p className="text-sm mt-1">Start creating scholarships to see them here</p>
          </div>
        )}
      </div>

      {/* Recent Applications Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[#38a696] to-[#52c0b0] rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
              <p className="text-sm text-gray-500">Latest applications from applicants</p>
            </div>
          </div>
          {allApplications && allApplications.length > 0 && (
            <Link href="/provider/applications">
              <Button className="bg-primary-brand text-white hover:bg-primary-brand/90 shadow-sm">
                View All
              </Button>
            </Link>
          )}
        </div>

        {isLoadingApplications ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : recentApplications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Scholarship
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Major
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    GPA
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentApplications.map((application) => {
                  const { fullName, email, major, gpa } = application.applicationVo;
                  const status = application.status || 'pending';
                  const scholarshipTitle = application.scholarshipVo?.title || 'N/A';

                  return (
                    <tr
                      key={application.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleViewApplication(application)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#38a696] to-[#52c0b0] flex items-center justify-center text-white font-semibold">
                            {fullName?.charAt(0).toUpperCase() || 'A'}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{fullName || 'N/A'}</p>
                            <p className="text-sm text-gray-500">{email || 'N/A'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900 line-clamp-1 max-w-xs">
                          {scholarshipTitle}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{major || 'N/A'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-primary-brand">{gpa || 'N/A'}</p>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
                            getStatusColor(status)
                          )}
                        >
                          {t(formatStatus(status))}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-lg">No applications yet</p>
            <p className="text-sm mt-1">
              Applications will appear here when applicants apply to your scholarships
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
