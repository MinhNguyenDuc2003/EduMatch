import React from 'react';
import { useTranslations } from 'next-intl';
import ApplicationsFilters from './ApplicationsFilters';

interface ApplicationsContentHeaderProps {
  scholarshipTitle: string;
  filteredCount: number;
  totalCount: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

const ApplicationsContentHeader = React.memo(
  ({
    scholarshipTitle,
    filteredCount,
    totalCount,
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
  }: ApplicationsContentHeaderProps) => {
    const t = useTranslations('providerApplications');

    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{scholarshipTitle}</h2>
          <p className="text-sm text-gray-600 mt-1">
            {t('applicationsCount', { filteredCount, totalCount })}
          </p>
        </div>

        <ApplicationsFilters
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={onStatusFilterChange}
        />
      </div>
    );
  }
);

ApplicationsContentHeader.displayName = 'ApplicationsContentHeader';

export default ApplicationsContentHeader;
