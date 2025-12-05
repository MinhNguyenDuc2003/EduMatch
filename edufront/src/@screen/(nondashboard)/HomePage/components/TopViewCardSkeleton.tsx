'use client';

import { Skeleton } from '@/pattern/cus/skeleton';

export default function TopViewCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col">
      <Skeleton className="w-full h-40" />
      <div className="flex-1 flex flex-col p-4 space-y-3">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-24 mt-auto" />
      </div>
    </div>
  );
}
