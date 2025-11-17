'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
} from './components';
import CardSmalPic from '@/pattern/share/CardSmalPic';
import { type ShortlistTab, TAB_CONFIGS } from './types';
import { useGetFollowedProvidersQuery, useUnfollowProviderMutation } from '@/state/apiProvider';
import {
  useGetTrackedScholarshipsQuery,
  useUnfollowScholarshipMutation,
} from '@/state/apiScholarship';
import ApplicationCard from './components/ApplicationCard';
import {
  useDeleteApplicationMutation,
  useGetApplicationsQuery,
  useGetAppliedApplicationQuery,
} from '@/state/apiApplicant';
import { Button } from '@/lib/cus/button';

export default function ActivityManagement() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ShortlistTab>('tracking');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [selectedAppliedScholarship, setSelectedAppliedScholarship] =
    useState<ApplicationScholarship | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { data: trackedScholarshipsData, isLoading: isLoadingTrackedScholarships } =
    useGetTrackedScholarshipsQuery();
  const { data: followedProvidersData, isLoading: isLoadingFollowedProviders } =
    useGetFollowedProvidersQuery();
  const { data: appliedScholarshipsData, isLoading: isLoadingAppliedScholarships } =
    useGetAppliedApplicationQuery();
  const {
    data: applicationsData,
    isLoading: isLoadingApplications,
    refetch: refetchApplications,
  } = useGetApplicationsQuery();
  const [deleteApplication] = useDeleteApplicationMutation();
  const [unfollowScholarship] = useUnfollowScholarshipMutation();
  const [unfollowProvider] = useUnfollowProviderMutation();

  const handleTabChange = (tab: ShortlistTab) => {
    setActiveTab(tab);
  };

  const isFollowingTab = activeTab === 'following';
  const isAppliedTab = activeTab === 'applied';
  const isTrackedTab = activeTab === 'tracking';
  const isApplicationTab = activeTab === 'application';

  const handleViewDetails = (slug: string) => {
    router.push(`/scholarships/${slug}`);
  };

  const handleViewProvider = (providerId: number) => {
    router.push(`/applicant/providers/${providerId}`);
  };

  const handleUntrack = async (id: number) => {
    switch (activeTab) {
      case 'tracking': {
        try {
          await unfollowScholarship({
            scholarshipId: id,
          }).unwrap();
        } catch (error) {
          console.log('Failed to untrack scholarship:', error);
        }
        break;
      }
      case 'applied':
        break;
      case 'following': {
        try {
          await unfollowProvider(id).unwrap();
        } catch (error) {
          console.log('Failed to unfollow provider:', error);
        }
        break;
      }
    }
  };

  const handleDeleteApplication = async (applicationId: number) => {
    try {
      await deleteApplication({ applicationId }).unwrap();
    } catch (error) {
      console.log('Failed to delete application:', error);
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
              ) : // Empty State
              isTrackedTab && trackedScholarshipsData?.length === 0 ? (
                <EmptyState tab={activeTab} />
              ) : isFollowingTab && followedProvidersData?.length === 0 ? (
                <EmptyState tab={activeTab} />
              ) : isApplicationTab && applicationsData?.length === 0 ? (
                <EmptyState tab={activeTab} />
              ) : isAppliedTab && appliedScholarshipsData?.length === 0 ? (
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
                    value="Create New Application"
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
      />
    </div>
  );
}
