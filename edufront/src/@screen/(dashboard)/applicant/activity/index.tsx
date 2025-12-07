'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  HeroSection,
  TabSwitcher,
  EmptyState,
  ProviderCard,
  ProviderCardSkeleton,
  CardSmalPicSkeleton,
  ApplicationCardSkeleton,
  AppliedScholarshipCard,
  ApplicationDetail,
  ReportCard,
  ReportCardSkeleton,
  ReportDetail,
} from './components';
import CardSmalPic from '@/pattern/share/CardSmalPic';
import { type ShortlistTab, getTabConfigs } from './types';
import { useGetFollowedProvidersQuery, useUnfollowProviderMutation } from '@/state/apiProvider';
import {
  useGetTrackedScholarshipsQuery,
  useUnfollowScholarshipMutation,
} from '@/state/apiScholarship';
import ApplicationCard from './components/ApplicationCard';
import {
  useDeleteApplicationMutation,
  useDeleteReportMutation,
  useGetApplicationsQuery,
  useGetAppliedApplicationQuery,
  useGetMyReportQuery,
} from '@/state/apiApplicant';
import { Button } from '@/pattern/cus/button';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export default function ActivityManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const { isApplicant } = useAuth();
  const [activeTab, setActiveTab] = useState<ShortlistTab>('tracking');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [selectedAppliedScholarship, setSelectedAppliedScholarship] =
    useState<ApplicationScholarship | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<MyReport | null>(null);
  const [isReportDetailOpen, setIsReportDetailOpen] = useState(false);
  const TAB_CONFIGS = getTabConfigs(t);

  const { data: trackedScholarshipsData, isLoading: isLoadingTrackedScholarships } =
    useGetTrackedScholarshipsQuery(undefined, { skip: activeTab !== 'tracking' });
  const { data: followedProvidersData, isLoading: isLoadingFollowedProviders } =
    useGetFollowedProvidersQuery(undefined, { skip: activeTab !== 'following' });
  const { data: appliedScholarshipsData, isLoading: isLoadingAppliedScholarships } =
    useGetAppliedApplicationQuery(undefined, { skip: activeTab !== 'applied' });
  const {
    data: applicationsData,
    isLoading: isLoadingApplications,
    refetch: refetchApplications,
  } = useGetApplicationsQuery(undefined, { skip: activeTab !== 'application' });
  const { data: reportData, isLoading: isLoadingReport } = useGetMyReportQuery(undefined, {
    skip: activeTab !== 'report',
  });
  const [deleteReport] = useDeleteReportMutation();
  const [deleteApplication] = useDeleteApplicationMutation();
  const [unfollowScholarship] = useUnfollowScholarshipMutation();
  const [unfollowProvider] = useUnfollowProviderMutation();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab as ShortlistTab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: ShortlistTab) => {
    setActiveTab(tab);
    router.push(`/applicant/activity?tab=${tab}`);
  };

  const isFollowingTab = activeTab === 'following';
  const isAppliedTab = activeTab === 'applied';
  const isTrackedTab = activeTab === 'tracking';
  const isApplicationTab = activeTab === 'application';
  const isReportTab = activeTab === 'report';

  const handleViewDetails = (slug?: string) => {
    router.push(`/scholarships/${slug}`);
  };

  const handleViewProvider = (providerId?: number) => {
    router.push(`/providers/${providerId}`);
  };

  const handleUntrack = async (id: number) => {
    switch (activeTab) {
      case 'tracking': {
        try {
          await unfollowScholarship({
            scholarshipId: id,
          }).unwrap();
          toast.success(t('toast.trackScholarship.untrack'));
        } catch (error) {
          toast.error(t('toast.trackScholarship.untrackFailed'));
          console.log('Failed to untrack scholarship:', error);
        }
        break;
      }
      case 'applied':
        break;
      case 'following': {
        try {
          await unfollowProvider(id).unwrap();
          toast.success(t('toast.followProvider.unfollow'));
        } catch (error) {
          toast.error(t('toast.followProvider.unfollowFailed'));
          console.log('Failed to unfollow provider:', error);
        }
        break;
      }
    }
  };

  const handleDeleteApplication = async (applicationId: number) => {
    try {
      await deleteApplication({ applicationId }).unwrap();
      toast.success(t('toast.deleteApplication.deleteSuccess'));
    } catch (error) {
      console.log('Failed to delete application:', error);
      toast.error(t('toast.deleteApplication.deleteFailed'));
    }
    refetchApplications();
  };

  const handleCreateNew = () => {
    router.push(`/applicant/applications/create`);
  };

  const handleEditApplication = (application: Application) => {
    router.push(`/applicant/applications/${application.id}`);
  };

  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
    setSelectedAppliedScholarship(null);
    setIsDetailOpen(true);
  };

  const handleViewAppliedScholarship = (appliedScholarship: ApplicationScholarship) => {
    setSelectedApplication(appliedScholarship.applicationVo);
    setSelectedAppliedScholarship(appliedScholarship);
    setIsDetailOpen(true);
  };

  const handleDeleteReport = async (reportId: number) => {
    try {
      await deleteReport({ reportId }).unwrap();
      toast.success(t('toast.reportDeleted'));
    } catch (error) {
      toast.error(t('toast.reportDeletedFailed'));
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <HeroSection />

      <section className="relative z-10 -mt-16 pb-20">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-40">
          {/* Container */}
          <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] backdrop-blur-sm">
            <div className=" border-slate-100 bg-white/50 p-6 pb-0">
              <TabSwitcher tabs={TAB_CONFIGS} activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
            <div className="p-6">
              {/* Loading Skeletons */}
              {isTrackedTab && isLoadingTrackedScholarships ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, index) => (
                    <CardSmalPicSkeleton key={`skeleton-tracked-${index}`} />
                  ))}
                </div>
              ) : isFollowingTab && isLoadingFollowedProviders ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, index) => (
                    <ProviderCardSkeleton key={`skeleton-provider-${index}`} />
                  ))}
                </div>
              ) : isApplicationTab && isLoadingApplications ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, index) => (
                    <ApplicationCardSkeleton key={`skeleton-application-${index}`} />
                  ))}
                </div>
              ) : isAppliedTab && isLoadingAppliedScholarships ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, index) => (
                    <ApplicationCardSkeleton key={`skeleton-application-${index}`} />
                  ))}
                </div>
              ) : isReportTab && isLoadingReport ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, index) => (
                    <ReportCardSkeleton key={`skeleton-report-${index}`} />
                  ))}
                </div>
              ) : // Empty State
              isTrackedTab && trackedScholarshipsData?.length === 0 ? (
                <EmptyState tab={activeTab} />
              ) : isFollowingTab && followedProvidersData?.length === 0 ? (
                <EmptyState tab={activeTab} />
              ) : isApplicationTab && applicationsData?.length === 0 ? (
                <div className="flex flex-col gap-4 ">
                  {isApplicant ? (
                    <Button
                      variant="custom"
                      color="gray"
                      onClick={handleCreateNew}
                      value={t('activity.applicationDetail.createNewApplication')}
                    />
                  ) : (
                    <div className="text-center text-gray-500 text-sm">
                      {t('activity.applicationDetail.notApplicantProfileCreatedYet')}
                    </div>
                  )}
                  <EmptyState tab={activeTab} />
                </div>
              ) : isAppliedTab &&
                appliedScholarshipsData?.length === 0 &&
                !isLoadingAppliedScholarships ? (
                <EmptyState tab={activeTab} />
              ) : isReportTab && reportData?.length === 0 ? (
                <EmptyState tab={activeTab} />
              ) : // Display Data
              isTrackedTab ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {trackedScholarshipsData?.map((scholarship) => (
                    <CardSmalPic
                      key={scholarship.id}
                      scholarship={scholarship}
                      onViewDetails={() => handleViewDetails(scholarship.slug)}
                      onToggleTracking={() => handleUntrack(scholarship.id)}
                    />
                  ))}
                </div>
              ) : isFollowingTab ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {followedProvidersData?.map((provider, index) => (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                      onViewDetails={() => handleViewProvider(provider.id)}
                      onUnfollow={() => handleUntrack(provider.id)}
                    />
                  ))}
                </div>
              ) : isApplicationTab ? (
                <div className="flex flex-col gap-4 ">
                  <Button
                    variant="custom"
                    color="gray"
                    onClick={handleCreateNew}
                    value={t('activity.applicationDetail.createNewApplication')}
                  />
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {applicationsData?.map((application) => (
                      <ApplicationCard
                        key={application.id}
                        application={application}
                        onViewDetails={() => handleViewApplication(application)}
                        onEdit={handleEditApplication}
                        onDelete={handleDeleteApplication}
                      />
                    ))}
                  </div>
                </div>
              ) : isAppliedTab ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {appliedScholarshipsData?.map((application) => (
                    <AppliedScholarshipCard
                      key={application.id}
                      appliedScholarship={application}
                      onViewDetails={() => handleViewAppliedScholarship(application)}
                      onViewScholarship={handleViewDetails}
                    />
                  ))}
                </div>
              ) : isReportTab ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {reportData?.map((report) => (
                    <ReportCard
                      key={report.id}
                      report={report}
                      onViewDetails={(report) => {
                        setSelectedReport(report);
                        setIsReportDetailOpen(true);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState tab={activeTab} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Application Detail Sheet */}
      <ApplicationDetail
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        application={selectedApplication}
        appliedScholarship={selectedAppliedScholarship}
        onViewProvider={handleViewProvider}
        onViewScholarship={handleViewDetails}
      />

      {/* Report Detail Sheet */}
      <ReportDetail
        open={isReportDetailOpen}
        onOpenChange={setIsReportDetailOpen}
        report={selectedReport}
        onDelete={handleDeleteReport}
      />
    </div>
  );
}
