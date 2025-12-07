import React from 'react';
import { useTranslations } from 'next-intl';

interface ApplicationsEmptyStateProps {
  hasApplications: boolean;
}

const ApplicationsEmptyState = React.memo(({ hasApplications }: ApplicationsEmptyStateProps) => {
  const t = useTranslations('providerApplications');

  return (
    <div className="flex-1 flex items-center justify-center bg-white rounded-xl border border-gray-200">
      <div className="text-center">
        <p className="text-gray-500 text-lg">{t('noApplicationsFound')}</p>
        <p className="text-gray-400 text-sm mt-2">
          {hasApplications ? t('tryAdjustingFilters') : t('noApplicationsYet')}
        </p>
      </div>
    </div>
  );
});

ApplicationsEmptyState.displayName = 'ApplicationsEmptyState';

export default ApplicationsEmptyState;
