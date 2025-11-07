import { Skeleton } from '@/lib/cus/skeleton';

export default function ProviderCardSkeleton() {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-2">
      {/* Banner Section Skeleton */}
      <div className="relative rounded-lg h-18 w-full overflow-hidden bg-slate-50">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>

      {/* Logo and Name Skeleton - Absolute positioned */}
      <div
        className="absolute flex items-end gap-3 left-5 z-10"
        style={{ top: 'calc(0.5rem + 5rem - 2rem)' }}
      >
        {/* Logo Skeleton */}
        <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
        
        {/* Name and Verified Badge Skeleton */}
        <div className="flex items-center gap-2 min-w-0 pb-1">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="flex flex-1 flex-col p-2 pt-16">
        {/* Phone Skeleton */}
        <div className="mb-3 flex items-center gap-2">
          <Skeleton className="h-4 w-4 flex-shrink-0 rounded" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Email Skeleton */}
        <div className="mb-4 flex items-center gap-2">
          <Skeleton className="h-4 w-4 flex-shrink-0 rounded" />
          <Skeleton className="h-4 w-40" />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Unfollow Button Skeleton */}
        <div className="pt-2 border-t border-slate-300">
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>
      </div>
    </article>
  );
}

