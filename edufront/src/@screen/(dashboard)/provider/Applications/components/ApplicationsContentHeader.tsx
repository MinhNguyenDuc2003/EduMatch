import React from 'react';
import { useTranslations } from 'next-intl';
import ApplicationsFilters from './ApplicationsFilters';
import { ApplicationRecommendationDialog } from './ApplicationRecommendationDialog';

interface ApplicationsContentHeaderProps {
  scholarship: Scholarship;
  filteredCount: number;
  totalCount: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onView: (applicationScholarship: ApplicationScholarship) => void;
}

const ApplicationsContentHeader = React.memo(
  ({
    scholarship,
    filteredCount,
    totalCount,
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    onView,
  }: ApplicationsContentHeaderProps) => {
    const t = useTranslations('providerApplications');

    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-gray-900">{scholarship.title}</h2>
            <ApplicationRecommendationDialog scholarship={scholarship} onView={onView} />
          </div>
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
