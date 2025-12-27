import React from 'react';
import { useTranslations } from 'next-intl';
import { Download } from 'lucide-react';
import { Button } from '@/pattern/cus/button';

interface ApplicationsHeaderProps {
  selectedScholarship: Scholarship | null;
}

const ApplicationsHeader = React.memo(({ selectedScholarship }: ApplicationsHeaderProps) => {
  const t = useTranslations('providerApplications');

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
        <p className="text-gray-600 mt-1">{t('subtitle')}</p>
      </div>
    </div>
  );
});

ApplicationsHeader.displayName = 'ApplicationsHeader';

export default ApplicationsHeader;
