'use client';

import { HeroSection } from './components';
import ScholarshipCard from '@/pattern/share/ScholarshipCard';
import { useGetRecommendedScholarshipsQuery } from '@/state/apiScholarship';
import { useRouter } from 'next/navigation';
import { useFollowProviderMutation, useUnfollowProviderMutation } from '@/state/apiProvider';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { PreferencesWeightDialog } from './components/PreferencesWeightDialog';
import { useGetAllProfilesQuery } from '@/state/apiApplicant';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/pattern/cus/select';
import { useEffect, useState } from 'react';

export default function RecommendedScholarships() {
  const router = useRouter();
  const t = useTranslations('recommendedScholarships');
  const tToast = useTranslations('toast');

  const { data: profiles, isLoading: isLoadingProfiles } = useGetAllProfilesQuery();
  const [selectedProfileId, setSelectedProfileId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (profiles && profiles.length > 0 && selectedProfileId === undefined) {
      setSelectedProfileId(profiles.find((p) => p.type === 'Current')?.id);
    }
  }, [profiles, selectedProfileId]);

  const {
    data: scholarships,
    isLoading,
    isFetching,
    refetch,
  } = useGetRecommendedScholarshipsQuery(
    { profileId: selectedProfileId || 0 }, // Pass 0 or handle skip if undefined if query allows, but usually better to wait or pass a dummy valid if required
    { skip: selectedProfileId === undefined }
  );
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
    router.push(`/scholarships/${slug}`);
  };

  const handleViewProvider = (providerId: number) => {
    router.push(`/providers/${providerId}`);
  };

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <HeroSection />

      <section className="relative z-10 -mt-16 pb-20">
        <div className="mx-auto max-w-7xl w-full px-6 sm:px-10 lg:px-40">
          {/* Container */}
          <div className="flex flex-col rounded-3xl border border-white/60 bg-white/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">{t('title')}</h2>
                <div>
                  {isLoading || isFetching
                    ? t('matchingLoading')
                    : t('description', { count: scholarships?.length || 0 })}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="">
                  <Select
                    value={selectedProfileId?.toString()}
                    onValueChange={(value) => setSelectedProfileId(Number(value))}
                    disabled={isLoadingProfiles}
                  >
                    <SelectTrigger className="w-[200px] border border-gray-600">
                      <SelectValue placeholder={t('selectProfile')} />
                    </SelectTrigger>
                    <SelectContent>
                      {profiles?.map((profile) => (
                        <SelectItem key={profile.id} value={profile.id.toString()}>
                          {profile.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <PreferencesWeightDialog refetch={refetch} />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col p-4 gap-4">
              {isLoading || isFetching ? (
                <div className="flex h-full items-center justify-center">
                  <Loader2 className="w-10 h-10 animate-spin" />
                </div>
              ) : (
                scholarships?.map((scholarship) => (
                  <ScholarshipCard
                    applicantProfile={profiles?.find((p) => p.type === 'Current')}
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
