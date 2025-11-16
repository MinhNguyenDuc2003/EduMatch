import React from 'react';
import { useTranslations } from 'next-intl';
import { Users } from 'lucide-react';

const ApplicationsSelectScholarship = React.memo(() => {
  const t = useTranslations('providerApplications');

  return (
    <div className="flex-1 flex items-center justify-center bg-white rounded-xl border border-gray-200">
      <div className="text-center">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg font-medium">{t('selectScholarship')}</p>
        <p className="text-gray-400 text-sm mt-2">{t('selectScholarshipDescription')}</p>
      </div>
    </div>
  );
});

ApplicationsSelectScholarship.displayName = 'ApplicationsSelectScholarship';

export default ApplicationsSelectScholarship;
