'use client';

import { useRouter } from 'next/navigation';
import ProfileHeader from '@/@screen/(dashboard)/provider/ProviderProfile/components/ProfileHeader';
import {
  useGetProviderProfileByIdQuery,
  useFollowProviderMutation,
  useUnfollowProviderMutation,
} from '@/state/apiProvider';
import {
  useFollowScholarshipMutation,
  useUnfollowScholarshipMutation,
  useGetScholarshipsByProviderIdQuery,
} from '@/state/apiScholarship';
import { Button } from '@/lib/cus/button';
import { Skeleton } from '@/lib/cus/skeleton';
import { ProfileHeaderSkeleton } from '@/@screen/(dashboard)/provider/ProviderProfile/components/ProfileHeader';
import {
  FollowButton,
  DescriptionSection,
  ScholarshipsSection,
  ProviderInformationSidebar,
} from './components';
import { useTranslations } from 'next-intl';

export default function ViewProviderProfile({ providerId }: { providerId: number }) {
  const router = useRouter();
  const t = useTranslations('viewProviderProfile');

  const { data: providerProfile, isLoading: isLoadingProfile } =
    useGetProviderProfileByIdQuery(providerId);
  const {
    data: scholarshipsData = [],
    isLoading: isLoadingScholarships,
    refetch,
  } = useGetScholarshipsByProviderIdQuery(providerId);

  const [followProvider] = useFollowProviderMutation();
  const [unfollowProvider] = useUnfollowProviderMutation();
  const [followScholarship] = useFollowScholarshipMutation();
  const [unfollowScholarship] = useUnfollowScholarshipMutation();

  const handleFollowProvider = async (id: number) => {
    const isFollowing = providerProfile?.isFollow === 1;
    try {
      if (isFollowing) {
        await unfollowProvider(id).unwrap();
      } else {
        await followProvider(id).unwrap();
      }
    } catch (error) {
      console.log('Failed to toggle follow:', error);
    }
    refetch();
  };

  const handleApply = (scholarship: Scholarship) => {
    console.log('Apply to:', scholarship.title);
    // TODO: Implement apply logic
  };

  const handleToggleTracking = async (scholarshipId: number) => {
    if (!providerId) {
      console.log('User ID not available');
      return;
    }
    const scholarship = scholarshipsData?.find((s) => s.id === scholarshipId);
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
      console.log('Failed to toggle tracking:', error);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="py-8 px-4 lg:px-40">
          <div className="max-w-7xl mx-auto space-y-6">
            <ProfileHeaderSkeleton />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-96 w-full rounded-lg" />
              </div>
              <div className="lg:col-span-1">
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!providerProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('notFound')}</h2>
            <p className="text-gray-600 mb-4">{t('notFoundDescription')}</p>
            <Button onClick={() => router.back()} className="mt-4">
              {t('goBack')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8 px-4 lg:px-40">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Profile Header */}
          <ProfileHeader
            currentData={providerProfile}
            isEdit={false}
            rightElement={
              <FollowButton
                isFollowing={providerProfile.isFollow === 1}
                onToggle={() => handleFollowProvider(providerId)}
              />
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <DescriptionSection description={providerProfile.description} />
              <ScholarshipsSection
                scholarships={scholarshipsData}
                isLoading={isLoadingScholarships}
                onApply={handleApply}
                onToggleTracking={handleToggleTracking}
                onFollowProvider={handleFollowProvider}
              />
            </div>

            {/* Provider Information Sidebar */}
            <ProviderInformationSidebar providerProfile={providerProfile} />
          </div>
        </div>
      </div>
    </div>
  );
}
