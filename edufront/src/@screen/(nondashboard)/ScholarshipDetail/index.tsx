'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/lib/cus/button';
import {
  useFollowScholarshipMutation,
  useGetScholarshipBySlugQuery,
  useUnfollowScholarshipMutation,
} from '@/state/apiScholarship';
import { useFollowProviderMutation, useUnfollowProviderMutation } from '@/state/apiProvider';
import {
  ScholarshipMetadata,
  ScholarshipContent,
  ScholarshipSidebar,
  ScholarshipDetailSkeleton,
  ScholarshipImages,
} from './components';
import BreadcrumbHeader from '@/pattern/core/BreadcrumbHeader';
import SubmitApplicationDialog from '@/pattern/share/SubmitApplicationDialog';
import { useTranslations } from 'next-intl';

export default function ScholarshipDetail({ slug }: { slug: string }) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const t = useTranslations('scholarshipDetail');

  const { data: scholarship, isLoading, isError, refetch } = useGetScholarshipBySlugQuery(slug);
  const [followProvider] = useFollowProviderMutation();
  const [unfollowProvider] = useUnfollowProviderMutation();
  const [followScholarship] = useFollowScholarshipMutation();
  const [unfollowScholarship] = useUnfollowScholarshipMutation();

  if (isLoading) {
    return <ScholarshipDetailSkeleton />;
  }

  if (isError || !scholarship) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('notFound')}</h1>
          <Button
            value={t('backToScholarships')}
            onClick={() => router.push('/scholarships')}
            variant="outline"
          />
        </div>
      </div>
    );
  }

  const {
    id: scholarshipId,
    title: scholarshipTitle,
    fundingAmount: scholarshipFundingAmount,
    endDate: scholarshipEndDate,
    isFollow: isTracked,
    views: scholarshipView,
    providerProfileVo,
  } = scholarship;
  const { id: providerId, isFollow: isFollowingValue } = providerProfileVo;

  // Handle track/untrack scholarship
  const handleToggleTracking = async () => {
    try {
      if (isTracked === 1) {
        await unfollowScholarship({
          scholarshipId: scholarshipId,
        }).unwrap();
      } else {
        await followScholarship({
          scholarshipId: scholarshipId,
        }).unwrap();
      }
    } catch (error) {
      console.log('Failed to toggle tracking:', error);
    }
  };

  // Handle follow/unfollow provider
  const handleToggleFollow = async () => {
    if (!providerId) return;

    try {
      if (isFollowingValue === 1) {
        await unfollowProvider(providerId).unwrap();
      } else {
        await followProvider(providerId).unwrap();
      }
      refetch();
    } catch (error) {
      console.log('Failed to toggle follow provider:', error);
    }
  };

  const handleViewProvider = (providerId: number) => {
    router.push(`/applicant/providers/${providerId}`);
  };

  const handleApplyNow = () => {
    setIsDialogOpen(true);
  };

  const handleSubmitApplication = async (applicationId: number) => {
    // TODO: Implement API call to submit application to scholarship
    console.log('Submitting application', applicationId, 'to scholarship', scholarship?.id);
    // You can add the API call here when the endpoint is available
    // Example:
    // await submitApplicationToScholarship({ applicationId, scholarshipId: scholarship.id }).unwrap();
  };

  // Format date from timestamp (endDate is timestamp number)
  const formattedDate = scholarshipEndDate
    ? (() => {
        try {
          const date = new Date(scholarshipEndDate);
          if (isNaN(date.getTime())) return t('noDeadline');
          return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });
        } catch {
          return t('noDeadline');
        }
      })()
    : t('noDeadline');

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs Header */}
      <BreadcrumbHeader
        items={[{ label: t('scholarships'), href: '/scholarships' }, { label: scholarshipTitle }]}
      />

      {/* Main Content */}
      <div className="mx-auto px-4 lg:px-40 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900">{scholarshipTitle}</h1>

            {/* Metadata Row */}
            <ScholarshipMetadata
              formattedDate={formattedDate}
              amount={scholarshipFundingAmount || '0'}
              isTracked={isTracked === 1}
              onToggleTracking={handleToggleTracking}
              view={scholarshipView || 0}
            />

            {/* Image */}
            <ScholarshipImages scholarship={scholarship} />

            {/* Content Sections */}
            <ScholarshipContent scholarship={scholarship} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 ">
            <div className="sticky top-24 flex flex-col gap-4">
              <ScholarshipSidebar
                onViewProvider={handleViewProvider}
                scholarship={scholarship}
                isFollowing={isFollowingValue === 1}
                onToggleFollow={handleToggleFollow}
              />
              {/* Action Button */}
              <Button
                value={t('applyNow')}
                variant="ok"
                size="lg"
                full
                onClick={handleApplyNow}
                className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Application Dialog */}
      {scholarship && (
        <SubmitApplicationDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          scholarshipId={scholarshipId}
          scholarshipTitle={scholarshipTitle}
          onSubmit={handleSubmitApplication}
        />
      )}
    </div>
  );
}
