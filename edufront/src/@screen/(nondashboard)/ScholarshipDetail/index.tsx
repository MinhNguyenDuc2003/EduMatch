'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/lib/cus/button';
import {
  useCheckIsTrackedScholarshipQuery,
  useFollowScholarshipMutation,
  useGetScholarshipBySlugQuery,
  useUnfollowScholarshipMutation,
} from '@/state/apiScholarship';
import {
  useFollowProviderMutation,
  useGetFollowedProvidersQuery,
  useUnfollowProviderMutation,
} from '@/state/apiProvider';
import { useGetProfileQuery } from '@/state/apiApplicant';
import { ScholarshipMetadata, ScholarshipContent, ScholarshipSidebar } from './components';
import BreadcrumbHeader from '@/pattern/core/BreadcrumbHeader';
import { Skeleton } from '@/lib/cus/skeleton';
import SubmitApplicationDialog from '@/pattern/share/SubmitApplicationDialog';

export default function ScholarshipDetail({ slug }: { slug: string }) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: scholarship, isLoading, isError } = useGetScholarshipBySlugQuery(slug);
  const { data: profile } = useGetProfileQuery();
  const userId = profile?.customer?.id;
  const { data: followedProviders } = useGetFollowedProvidersQuery();
  const [followProvider] = useFollowProviderMutation();
  const [unfollowProvider] = useUnfollowProviderMutation();
  const [followScholarship] = useFollowScholarshipMutation();
  const [unfollowScholarship] = useUnfollowScholarshipMutation();

  const { data: trackedData } = useCheckIsTrackedScholarshipQuery(scholarship?.id || 0, {
    skip: !scholarship?.id,
  });

  if (!scholarship && !isLoading) {
    return <div>Scholarship not found</div>;
  }
  const isTracked = !!trackedData;
  const isFollowing = scholarship?.providerProfileVo?.id
    ? followedProviders?.some((fp) => fp.providerId === scholarship.providerProfileVo.id) || false
    : false;

  // Handle track/untrack scholarship
  const handleToggleTracking = async () => {
    if (!userId || !scholarship?.id) {
      console.error('User ID or Scholarship ID not available');
      return;
    }
    try {
      if (isTracked) {
        await unfollowScholarship({
          scholarshipId: scholarship.id,
        }).unwrap();
      } else {
        await followScholarship({
          scholarshipId: scholarship.id,
        }).unwrap();
      }
    } catch (error) {
      console.error('Failed to toggle tracking:', error);
    }
  };

  // Handle follow/unfollow provider
  const handleToggleFollow = async () => {
    if (!scholarship?.providerProfileVo?.id) return;

    try {
      if (isFollowing) {
        await unfollowProvider(scholarship.providerProfileVo.id).unwrap();
      } else {
        await followProvider(scholarship.providerProfileVo.id).unwrap();
      }
    } catch (error) {
      console.error('Failed to toggle follow provider:', error);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <BreadcrumbHeader items={[{ label: 'Scholarships', href: '/scholarships' }]} />
        <div className="mx-auto px-4 lg:px-40 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !scholarship) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Scholarship not found</h1>
          <Button
            value="Back to Scholarships"
            onClick={() => router.push('/scholarships')}
            variant="outline"
          />
        </div>
      </div>
    );
  }

  // Format date from timestamp (endDate is timestamp number)
  const formattedDate = scholarship.endDate
    ? (() => {
        try {
          const date = new Date(scholarship.endDate);
          if (isNaN(date.getTime())) return 'No deadline';
          return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });
        } catch {
          return 'No deadline';
        }
      })()
    : 'No deadline';

  // Parse amount
  const amount = scholarship.fundingAmount
    ? scholarship.fundingAmount.replace(/[^0-9.]/g, '')
    : '0';

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs Header */}
      <BreadcrumbHeader
        items={[{ label: 'Scholarships', href: '/scholarships' }, { label: scholarship.title }]}
      />

      {/* Main Content */}
      <div className="mx-auto px-4 lg:px-40 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900">{scholarship.title}</h1>

            {/* Metadata Row */}
            <ScholarshipMetadata
              formattedDate={formattedDate}
              amount={amount}
              isTracked={isTracked}
              onToggleTracking={handleToggleTracking}
            />

            {/* Content Sections */}
            <ScholarshipContent scholarship={scholarship} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 ">
            <div className="sticky top-24 flex flex-col gap-4">
              <ScholarshipSidebar
                onViewProvider={handleViewProvider}
                scholarship={scholarship}
                isFollowing={isFollowing}
                onToggleFollow={handleToggleFollow}
              />
              {/* Action Button */}
              <Button
                value="Apply Now"
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
          scholarshipId={scholarship.id}
          scholarshipTitle={scholarship.title}
          onSubmit={handleSubmitApplication}
        />
      )}
    </div>
  );
}
