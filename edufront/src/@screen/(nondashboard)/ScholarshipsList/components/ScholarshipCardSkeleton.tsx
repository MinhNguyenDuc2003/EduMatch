import { Skeleton } from '@/lib/cus/skeleton';

export default function ScholarshipCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Organization Header Skeleton */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-md flex-shrink-0" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="w-9 h-9 rounded-full" />
        </div>
      </div>

      {/* Image Skeleton */}
      <div className="w-full h-64 bg-gray-100">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      {/* Content Skeleton */}
      <div className="p-5">
        {/* Title & Description Skeleton */}
        <div className="space-y-3 mb-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Info Tags Skeleton */}
        <div className="space-y-2 mb-3">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>

        {/* Footer Skeleton */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
