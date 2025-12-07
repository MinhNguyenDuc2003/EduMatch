'use client';
import Header from '@/pattern/share/Header';
import { useGetAllApplicationsQuery, useGetStatisticsQuery } from '@/state/apiProvider';
import React from 'react';
import { FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/lib/cus/button';
import {
  getStatusColor,
  formatStatus,
} from '@/@screen/(dashboard)/provider/Applications/utils/applicationUtils';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ConversionFunnelCard from './components/ConversionFunnelCard';
import DecisionStatusCard from './components/DecisionStatusCard';
import Top5Scholarship from './components/Top5Scholarship';

const DashboardPage = () => {
  const router = useRouter();
  const t = useTranslations('providerDashboard');
  const tApplications = useTranslations('providerApplications');
  const { data: statistics, isLoading: isLoadingStats } = useGetStatisticsQuery();
  const { data: allApplications, isLoading: isLoadingApplications } = useGetAllApplicationsQuery();

  // Get recent applications (limit to 10)
  const recentApplications: ApplicationScholarship[] = allApplications?.slice(0, 10) || [];

  const handleViewApplication = (application: ApplicationScholarship) => {
    router.push(`/provider/applications?scholarshipId=${application.scholarshipId}`);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <Header title={t('title')} subtitle={t('subtitle')} />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        <ConversionFunnelCard
          totalScholarships={statistics?.totalScholarships || 0}
          totalViews={statistics?.totalViews || 0}
          applyRate={statistics?.averageApplyRate || 0}
          viewButNoApplyRate={statistics?.viewButNoApplyRate || 0}
        />
        <DecisionStatusCard
          totalApplies={statistics?.totalApplies || 0}
          approveRate={statistics?.approveRate || 0}
          rejectRate={statistics?.rejectRate || 0}
          pendingRate={statistics?.pendingRate || 0}
        />
      </div>

      <Top5Scholarship
        top5ByView={statistics?.top5ByView || []}
        top5ByApply={statistics?.top5ByApply || []}
      />

      {/* Recent Applications Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[#38a696] to-[#52c0b0] rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t('recentApplications.title')}</h2>
              <p className="text-sm text-gray-500">{t('recentApplications.subtitle')}</p>
            </div>
          </div>
          {allApplications && allApplications.length > 0 && (
            <Link href="/provider/applications">
              <Button className="bg-primary-brand text-white hover:bg-primary-brand/90 shadow-sm">
                {t('recentApplications.viewAll')}
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
                    {t('recentApplications.applicant')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('recentApplications.scholarship')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('recentApplications.major')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('recentApplications.gpa')}
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('recentApplications.status')}
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
                          {tApplications(formatStatus(status))}
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
            <p className="text-lg">{t('recentApplications.noApplicationsYet')}</p>
            <p className="text-sm mt-1">{t('recentApplications.noApplicationsDescription')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
