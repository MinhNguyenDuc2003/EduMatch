import { Skeleton } from '@/lib/cus/skeleton';

export default function CardSmalPicSkeleton() {
  return (
    <div className="group bg-white flex flex-col rounded-lg border border-gray-200 shadow-sm relative h-full">
      {/* Track Icon Skeleton - Top Right */}
      <div className="absolute top-3 right-3 z-10">
        <Skeleton className="w-9 h-9 rounded-full" />
      </div>

      <div className="flex flex-col p-4 flex-1 h-full">
        {/* Header with University Logo and Title Skeleton */}
        <div className="flex gap-3 items-start pr-9 flex-shrink-0 mb-3">
          <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="flex-shrink-0 min-h-[1.25rem] mb-3">
          <Skeleton className="h-4 w-full" />
        </div>

        {/* Spacer - takes remaining space */}
        <div className="flex-1"></div>

        {/* Amount and Deadline Skeleton */}
        <div className="flex-shrink-0">
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
