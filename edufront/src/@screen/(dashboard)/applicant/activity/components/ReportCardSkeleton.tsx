import { Skeleton } from '@/lib/cus/skeleton';

export default function ReportCardSkeleton() {
  return (
    <article className="group relative flex gap-2 h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header Section Skeleton */}
      <div className="px-4 pt-4">
        <div className="flex flex-col justify-between gap-1">
          {/* Title Skeleton */}
          <Skeleton className="h-5 w-full mb-1" />
          <Skeleton className="h-5 w-3/4" />

          {/* Comment Skeleton */}
          <div className="flex flex-col mt-2">
            <Skeleton className="h-4 w-full mt-1" />
            <Skeleton className="h-4 w-5/6 mt-1" />
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="flex flex-1 flex-col px-4 pb-4 space-y-2">
        {/* Category Type Skeleton */}
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>

        {/* Category Description Skeleton */}
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Footer Section Skeleton (optional - only shown sometimes) */}
      <div className="border-t border-slate-200 p-3">
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </article>
  );
}
