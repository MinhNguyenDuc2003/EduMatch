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
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function RecommendedScholarships() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const t = useTranslations('recommendedScholarships');
  const tToast = useTranslations('toast');
  const {
    data: scholarships,
    isLoading,
    refetch,
  } = useGetRecommendedScholarshipsQuery({ topK: 12 });
  const [followProvider] = useFollowProviderMutation();
  const [unfollowProvider] = useUnfollowProviderMutation();

  const handleApply = (scholarship: Scholarship) => {
    console.log('Apply to:', scholarship.title);
    // TODO: Implement apply logic
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
        toast.success(tToast('followProvider.unfollow'));
      } else {
        await followProvider(scholarship.providerProfileVo?.id).unwrap();
        toast.success(tToast('followProvider.follow'));
      }
    } catch (error) {
      console.log('Failed to toggle follow provider:', error);
      toast.error(tToast('followProvider.followFailed'));
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
    router.push(`/providers/${providerId}`);
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
                <h2 className="text-lg font-bold">{t('title')}</h2>
              </div>
              <div>
                {isLoading
                  ? t('matchingLoading')
                  : t('description', { count: scholarships?.length || 0 })}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col p-4 gap-4">
              {isLoading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader2 className="w-10 h-10 animate-spin" />
                </div>
              ) : (
                scholarships?.map((scholarship) => (
                  <ScholarshipCard
                    key={scholarship.id}
                    scholarship={scholarship}
                    onApply={handleApply}
                    onFollowProvider={handleFollowProvider}
                    onViewScholarship={handleViewScholarship}
                    onViewProvider={handleViewProvider}
                    score={scholarship.score}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
