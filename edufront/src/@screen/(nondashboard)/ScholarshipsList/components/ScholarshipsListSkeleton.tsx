import { Skeleton } from '@/lib/cus/skeleton';
import { Filter } from 'lucide-react';
import ScholarshipCardSkeleton from './ScholarshipCardSkeleton';

export default function ScholarshipsListSkeleton() {
  return (
    <>
      {/* Mobile Search Bar & Filter Button Skeleton - Sticky */}
      <div className="lg:hidden fixed top-[60px] left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200 px-4 py-3">
        <div className="flex flex-row items-center gap-3">
          {/* Search Bar Skeleton */}
          <div className="flex-1">
            <Skeleton className="h-11 w-full rounded-full" />
          </div>

          {/* Filter Button Skeleton */}
          <Skeleton className="w-11 h-11 rounded-full flex-shrink-0" />
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 pt-20 pb-4 px-4 md:py-8 md:px-10 lg:px-40 lg:pt-8">
        {/* Main Content */}
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
            {/* Left Sidebar - Filters Skeleton (Desktop only, 3 columns) */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-20">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <Skeleton className="h-7 w-24" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                <div className="space-y-4">
                  {/* University Filter Skeleton */}
                  <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>

                  {/* Fields Filter Skeleton */}
                  <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>

                  {/* Study Level Filter Skeleton */}
                  <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>

                  {/* Country Filter Skeleton */}
                  <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>

                  {/* Scholarship Type Filter Skeleton */}
                  <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>

                  {/* GPA Filter Skeleton */}
                  <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <div className="pt-2 border-t border-gray-200 space-y-3">
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-2 w-full rounded-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-2 w-full rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Content - Scholarship Cards (6 columns desktop, full width mobile) */}
            <div className="lg:col-span-6 lg:col-start-4">
              {/* Premium Banner Skeleton */}
              <div className="mb-4 relative overflow-hidden rounded-xl p-4 md:p-6 border-2 border-white/20 bg-gradient-to-r from-slate-800 via-blue-700 to-slate-800">
                <div className="relative z-10">
                  {/* Mobile Layout Skeleton */}
                  <div className="md:hidden space-y-3">
                    <Skeleton className="h-5 w-24 bg-white/20" />
                    <Skeleton className="h-6 w-3/4 bg-white/30" />
                    <Skeleton className="h-4 w-full bg-white/20" />
                    <Skeleton className="h-10 w-full rounded-lg bg-white/30" />
                  </div>

                  {/* Desktop Layout Skeleton */}
                  <div className="hidden md:flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <Skeleton className="h-6 w-20 bg-white/20" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-2/3 bg-white/30" />
                        <Skeleton className="h-4 w-full bg-white/20" />
                      </div>
                    </div>
                    <Skeleton className="h-10 w-32 rounded-lg bg-white/30" />
                  </div>
                </div>
              </div>

              {/* Search Bar Skeleton - Desktop only */}
              <div className="mb-4 hidden lg:block">
                <Skeleton className="h-12 w-full rounded-full" />
              </div>

              {/* Scholarship Cards Skeletons */}
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <ScholarshipCardSkeleton key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

