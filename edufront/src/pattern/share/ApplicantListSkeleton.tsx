import { Skeleton } from '@/pattern/cus/skeleton';
import { useTranslations } from 'next-intl';
import React from 'react';

const ApplicantListSkeleton = () => {
  const t = useTranslations('aiApplicantSuggestions');

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="overflow-x-auto border rounded mb-4">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-2 sm:px-4 py-3 text-left w-10">
                <Skeleton className="h-4 w-4 rounded" />
              </th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold">{t('name')}</th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold hidden sm:table-cell">
                {t('gpa')}
              </th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold hidden md:table-cell">
                {t('university')}
              </th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold hidden md:table-cell">
                {t('contact')}
              </th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold hidden sm:table-cell">
                {t('score')}
              </th>
              <th className="px-2 sm:px-4 py-3 text-center font-semibold">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="border-b transition-colors">
                <td className="px-2 sm:px-4 py-3">
                  <Skeleton className="h-4 w-4 rounded" />
                </td>
                <td className="px-2 sm:px-4 py-3 font-medium text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-3 hidden sm:table-cell">
                  <Skeleton className="h-4 w-12" />
                </td>
                <td className="px-2 sm:px-4 py-3 hidden md:table-cell">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-3 hidden md:table-cell">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </td>
                <td className="px-2 md:h-full sm:px-4 py-3 hidden sm:table-cell">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="px-2 h-full sm:px-4 py-3 sm:table-cell">
                  <div className="flex items-center justify-center gap-2">
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
  );
};

export default ApplicantListSkeleton;
