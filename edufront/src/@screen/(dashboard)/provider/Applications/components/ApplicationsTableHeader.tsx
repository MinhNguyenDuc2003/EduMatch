import { useTranslations } from 'next-intl';
import React from 'react';

const ApplicationsTableHeader = React.memo(() => {
  const t = useTranslations('providerApplications');
  return (
    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
      <tr>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          {t('student')}
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          {t('major')}
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          {t('gpa')}
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          {t('appliedAt')}
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          {t('status')}
        </th>
        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
          {t('actions')}
        </th>
      </tr>
    </thead>
  );
});

ApplicationsTableHeader.displayName = 'ApplicationsTableHeader';

export default ApplicationsTableHeader;
