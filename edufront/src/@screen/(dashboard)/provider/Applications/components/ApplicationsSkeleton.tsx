import React from 'react';
import { Skeleton } from '@/lib/cus/skeleton';
import ApplicationsTableHeader from './ApplicationsTableHeader';
import ApplicationsFilters from './ApplicationsFilters';

interface ApplicationsSkeletonProps {
  scholarshipTitle?: string;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  statusFilter?: string;
  onStatusFilterChange?: (value: string) => void;
}

const ApplicationsSkeleton = React.memo(
  ({
    scholarshipTitle,
    searchQuery = '',
    onSearchChange,
    statusFilter = 'all',
    onStatusFilterChange,
  }: ApplicationsSkeletonProps) => {
    return (
      <>
        {/* Loading Skeleton Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex-1">
            {scholarshipTitle ? (
              <>
                <h2 className="text-xl font-semibold text-gray-900">{scholarshipTitle}</h2>
                <Skeleton className="h-4 w-48 mt-1" />
              </>
            ) : (
              <>
                <Skeleton className="h-7 w-64 mb-2" />
                <Skeleton className="h-4 w-48" />
              </>
            )}
          </div>
          {onSearchChange && onStatusFilterChange ? (
            <ApplicationsFilters
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              statusFilter={statusFilter}
              onStatusFilterChange={onStatusFilterChange}
            />
          ) : (
            <div className="flex gap-3">
              <Skeleton className="h-10 w-full sm:w-[200px]" />
              <Skeleton className="h-10 w-[160px]" />
            </div>
          )}
        </div>

      {/* Loading Skeleton Table */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
          <div className="overflow-y-auto flex-1">
            <table className="w-full">
              <ApplicationsTableHeader />
              <tbody className="divide-y divide-gray-200">
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-48" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-12" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Skeleton className="h-8 w-8 rounded" />
                        <Skeleton className="h-8 w-8 rounded" />
                        <Skeleton className="h-8 w-8 rounded" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
});

ApplicationsSkeleton.displayName = 'ApplicationsSkeleton';

export default ApplicationsSkeleton;

