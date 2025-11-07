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
} from './components';
import CardSmalPic from '@/pattern/share/CardSmalPic';
import { type ShortlistTab, TAB_CONFIGS } from './types';
import { useGetFollowedProvidersQuery, useUnfollowProviderMutation } from '@/state/apiProvider';
import {
  useGetTrackedScholarshipsQuery,
  useUnfollowScholarshipMutation,
} from '@/state/apiScholarship';
import { useGetProfileQuery } from '@/state/apiApplicant';

export default function ActivityManagement() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ShortlistTab>('tracking');
  const [appliedScholarships, setAppliedScholarships] = useState<Scholarship[]>([]);

  const { data: trackedScholarshipsData, isLoading: isLoadingTrackedScholarships } =
    useGetTrackedScholarshipsQuery();
  const { data: followedProvidersData, isLoading: isLoadingFollowedProviders } =
    useGetFollowedProvidersQuery();
  const { data: profile } = useGetProfileQuery();
  const [unfollowScholarship] = useUnfollowScholarshipMutation();
  const [unfollowProvider] = useUnfollowProviderMutation();

  const handleTabChange = (tab: ShortlistTab) => {
    setActiveTab(tab);
  };

  const trackedScholarships: ScholarshipWithDetails[] = trackedScholarshipsData || [];
  const followedProviders = followedProvidersData || [];
  const isFollowingTab = activeTab === 'following';
  const isTrackedTab = activeTab === 'tracking';
  const userId = profile?.customer?.id;

  const handleViewDetails = (scholarshipId: number) => {
    router.push(`/scholarships/${scholarshipId}`);
  };

  const handleUntrack = async (id: number) => {
    switch (activeTab) {
      case 'tracking': {
        if (!userId) {
          console.error('User ID not available');
          return;
        }
        try {
          await unfollowScholarship({
            scholarshipId: id,
            userId,
          }).unwrap();
        } catch (error) {
          console.error('Failed to untrack scholarship:', error);
        }
        break;
      }
      case 'applied':
        setAppliedScholarships((prev) => prev.filter((item) => item.id !== id));
        break;
      case 'following': {
        try {
          await unfollowProvider(id).unwrap();
        } catch (error) {
          console.error('Failed to unfollow provider:', error);
        }
        break;
      }
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
              ) : isTrackedTab && trackedScholarships.length === 0 ? (
                <EmptyState tab={activeTab} />
              ) : isFollowingTab && followedProviders.length === 0 ? (
                <EmptyState tab={activeTab} />
              ) : isTrackedTab ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {trackedScholarships.map((scholarship) => (
                    <CardSmalPic
                      key={scholarship.id}
                      scholarship={scholarship}
                      onViewDetails={() => handleViewDetails(scholarship.id)}
                      onToggleTracking={() => handleUntrack(scholarship.id)}
                    />
                  ))}
                </div>
              ) : isFollowingTab ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {followedProviders.map((provider, index) => (
                    <ProviderCard
                      key={provider.providerId}
                      providerId={provider.providerId}
                      onViewDetails={() => {
                        // TODO: Navigate to provider profile page
                        console.log('View provider:', provider.providerId);
                      }}
                      onUnfollow={() => handleUntrack(provider.providerId)}
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
    </div>
  );
}
