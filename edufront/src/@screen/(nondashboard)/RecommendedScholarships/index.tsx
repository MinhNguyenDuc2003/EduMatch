'use client';

import { HeroSection } from './components';
import { ScholarshipCard } from '../ScholarshipsList/components';
import {
  useFollowScholarshipMutation,
  useGetRecommendedScholarshipsQuery,
  useUnfollowScholarshipMutation,
} from '@/state/apiScholarship';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useFollowProviderMutation, useUnfollowProviderMutation } from '@/state/apiProvider';

export default function RecommendedScholarships() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const {
    data: scholarships,
    isLoading,
    refetch,
  } = useGetRecommendedScholarshipsQuery({ topK: 10 });
  const [followScholarship] = useFollowScholarshipMutation();
  const [unfollowScholarship] = useUnfollowScholarshipMutation();
  const [followProvider] = useFollowProviderMutation();
  const [unfollowProvider] = useUnfollowProviderMutation();

  const handleApply = (scholarship: Scholarship) => {
    console.log('Apply to:', scholarship.title);
    // TODO: Implement apply logic
  };

  const handleToggleTracking = async (scholarshipId: number) => {
    const scholarship = scholarships?.find((s) => s.id === scholarshipId);
    const isTracked = scholarship?.isFollow === 1;

    try {
      if (isTracked) {
        await unfollowScholarship({
          scholarshipId,
        }).unwrap();
      } else {
        await followScholarship({
          scholarshipId,
        }).unwrap();
      }
    } catch (error) {
      console.error('Failed to toggle tracking:', error);
    }
  };

  // Handle follow/unfollow provider
  const handleFollowProvider = async (providerId: number) => {
    const scholarship = scholarships?.find((s) => s.providerProfileVo?.id === providerId);
    if (!scholarship) {
      return;
    }
    const isFollowing = scholarship.providerProfileVo?.isFollow === 1;
    try {
      if (isFollowing) {
        await unfollowProvider(scholarship.providerProfileVo?.id).unwrap();
      } else {
        await followProvider(scholarship.providerProfileVo?.id).unwrap();
      }
    } catch (error) {
      console.log('Failed to toggle follow provider:', error);
    }
    refetch();
  };

  const handleViewScholarship = (slug: string) => {
    if (!isAuthenticated) {
      router.push('http://159.89.200.244/oauth2/authorization/keycloak');
    } else {
      router.push(`/scholarships/${slug}`);
    }
  };

  const handleViewProvider = (providerId: number) => {
    router.push(`/applicant/providers/${providerId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <HeroSection />

      <section className="relative z-10 -mt-16 pb-20">
        <div className="mx-auto max-w-7xl w-full px-6 sm:px-10 lg:px-40">
          {/* Container */}
          <div className="flex flex-col rounded-3xl border border-white/60 bg-white/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center p-4 gap-4">
              <div>
                <h2 className="text-lg font-bold">Recommended Scholarships</h2>
              </div>
              <div>We found {scholarships?.length} scholarships that match your profile</div>
            </div>

            {/* Content */}
            <div className="flex flex-col p-4 gap-4">
              {scholarships?.map((scholarship) => (
                <ScholarshipCard
                  key={scholarship.id}
                  scholarship={scholarship}
                  onApply={handleApply}
                  onToggleTracking={handleToggleTracking}
                  onFollowProvider={handleFollowProvider}
                  onViewScholarship={handleViewScholarship}
                  onViewProvider={handleViewProvider}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
