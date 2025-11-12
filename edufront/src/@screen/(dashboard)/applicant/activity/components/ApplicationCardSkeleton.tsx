import { Skeleton } from '@/lib/cus/skeleton';

export default function ApplicationCardSkeleton() {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header Section Skeleton */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white p-5">
        <Skeleton className="h-6 w-40" />
      </div>

      {/* Content Section Skeleton */}
      <div className="flex flex-1 flex-col p-5 space-y-4">
        {/* Application Information Section */}
        <div className="space-y-3">
          {/* Section Title Skeleton */}
          <Skeleton className="h-3 w-48 mb-3" />

          {/* Application Name Skeleton */}
          <div className="flex flex-col space-y-1">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-4 w-36" />
          </div>

          {/* Major Skeleton */}
          <div className="flex flex-col space-y-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>

          {/* GPA Skeleton */}
          <div className="flex flex-col space-y-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Skills Skeleton */}
          <div className="flex flex-col space-y-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>

      {/* Action Buttons Section Skeleton */}
      <div className="border-t border-slate-200 bg-slate-50 p-4 flex gap-2">
        <Skeleton className="h-9 flex-1 rounded-lg" />
        <Skeleton className="h-9 flex-1 rounded-lg" />
      </div>
    </article>
  );
}

