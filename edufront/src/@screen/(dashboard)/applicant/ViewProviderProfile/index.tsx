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
import { Button } from '@/pattern/cus/button';
import { Skeleton } from '@/pattern/cus/skeleton';
import { ProfileHeaderSkeleton } from '@/@screen/(dashboard)/provider/ProviderProfile/components/ProfileHeader';
import {
  FollowButton,
  DescriptionSection,
  ScholarshipsSection,
  ProviderInformationSidebar,
} from './components';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/useAuth';
import { OctagonAlert } from 'lucide-react';
import { useState } from 'react';
import ReportDialog from '@/pattern/share/ReportDialog';
import { toast } from 'sonner';

export default function ViewProviderProfile({ providerId }: { providerId: number }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const t = useTranslations('viewProviderProfile');
  const tToast = useTranslations('toast');

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
  const [openReportDialog, setOpenReportDialog] = useState(false);

  const handleFollowProvider = async (id: number) => {
    const isFollowing = providerProfile?.isFollow === 1;
    try {
      if (isFollowing) {
        await unfollowProvider(id).unwrap();
        toast.success(tToast('followProvider.unfollow'));
      } else {
        await followProvider(id).unwrap();
        toast.success(tToast('followProvider.follow'));
      }
    } catch (error) {
      console.log('Failed to toggle follow:', error);
      toast.error(tToast('followProvider.followFailed'));
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
        toast.success(tToast('trackScholarship.untrack'));
      } else {
        await followScholarship({
          scholarshipId,
        }).unwrap();
        toast.success(tToast('trackScholarship.track'));
      }
    } catch (error) {
      console.log('Failed to toggle tracking:', error);
      toast.error(tToast('trackScholarship.trackFailed'));
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
              isAuthenticated && (
                <FollowButton
                  isFollowing={providerProfile.isFollow === 1}
                  onToggle={() => handleFollowProvider(providerId)}
                />
              )
            }
            itemReport={
              isAuthenticated && (
                <Button
                  variant="custom"
                  className="absolute group/report top-3 right-3 md:top-5 md:right-5 bg-white rounded-full p-1.5 md:p-2 flex items-center !gap-0 transition-all hover:!translate-0"
                  onClick={() => setOpenReportDialog(true)}
                >
                  <OctagonAlert className="w-4 h-4 md:w-5 md:h-5 group-hover/report:mr-10 md:group-hover/report:mr-12 transition-all duration-300" />
                  <span className="absolute right-1.5 md:right-2 text-xs md:text-sm opacity-0 max-w-0 overflow-hidden group-hover/report:opacity-100 group-hover/report:max-w-[60px] md:group-hover/report:max-w-[100px] transition-all duration-300 whitespace-nowrap">
                    {t('itemReport')}
                  </span>
                </Button>
              )
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
                isAuthenticated={isAuthenticated}
              />
            </div>

            {/* Provider Information Sidebar */}
            <ProviderInformationSidebar providerProfile={providerProfile} />
          </div>
        </div>
      </div>
      <ReportDialog
        open={openReportDialog}
        onOpenChange={setOpenReportDialog}
        initialType="PROVIDER"
        id={providerId}
        providerData={providerProfile}
      />
    </div>
  );
}
