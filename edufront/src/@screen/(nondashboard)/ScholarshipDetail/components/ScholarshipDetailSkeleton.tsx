'use client';
import { Skeleton } from '@/lib/cus/skeleton';
import BreadcrumbHeader from '@/pattern/core/BreadcrumbHeader';
import { useTranslations } from 'next-intl';

export default function ScholarshipDetailSkeleton() {
  const t = useTranslations('homepage.scholarshipDetail');

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbHeader items={[{ label: t('scholarships'), href: '/scholarships' }]} />
      <div className="mx-auto px-4 lg:px-40 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Title */}
            <Skeleton className="h-12 w-3/4" />

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-24 rounded-full" />
            </div>

            {/* Content Sections */}
            <div className="space-y-6">
              {/* Description Section */}
              <div>
                <Skeleton className="h-7 w-32 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              {/* Details Section */}
              <div>
                <Skeleton className="h-7 w-24 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-4/5 mb-3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-56" />
                  <Skeleton className="h-4 w-72" />
                  <Skeleton className="h-4 w-60" />
                </div>
              </div>

              {/* Criteria Section */}
              <div>
                <Skeleton className="h-7 w-28 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-4/5" />
              </div>

              {/* Benefits Section */}
              <div>
                <Skeleton className="h-7 w-24 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              {/* Preferences Section */}
              <div>
                <Skeleton className="h-7 w-36 mb-3" />
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full rounded-lg" />
                  <Skeleton className="h-16 w-full rounded-lg" />
                  <Skeleton className="h-16 w-5/6 rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-4">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                {/* Provider Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-32 mb-2" />
                    </div>
                    <Skeleton className="h-8 w-20 rounded" />
                  </div>
                </div>

                {/* Provider Info */}
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>

              {/* Apply Button */}
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
