import { useTranslations } from 'next-intl';
import React from 'react';

const ScholarshipProviderGuildelines = () => {
  const t = useTranslations('scholarshipProviderGuidelines.guidelines');
  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-40 py-6 flex flex-col bg-white space-y-6 ">
      <h1 className="text-4xl font-semibold">{t('title')}</h1>
      <p className="text-lg">{t('description')}</p>
      <ul className="list-disc list-inside space-y-2 text-md px-4">
        <li>{t('guidelines.1')}</li>
        <li>{t('guidelines.2')}</li>
        <li>{t('guidelines.3')}</li>
        <li>{t('guidelines.4')}</li>
        <li>{t('guidelines.5')}</li>
        <li>{t('guidelines.6')}</li>
        <li>{t('guidelines.7')}</li>
        <li>{t('guidelines.8')}</li>
        <li>{t('guidelines.9')}</li>
      </ul>
      <h2 className="text-2xl font-semibold">{t('requiredInformation.title')}</h2>
      <h3 className="text-xl font-semibold">
        {t('requiredInformation.scholarshipProviderInformation')}
      </h3>
      <p className="text-lg">
        {t('requiredInformation.scholarshipProviderInformationDescription')}
      </p>
      <h3 className="text-xl font-semibold">{t('requiredInformation.scholarshipInformation')}</h3>
      <p className="text-lg">{t('requiredInformation.scholarshipInformationDescription')}</p>
      <ul className="list-disc list-inside space-y-2 text-md px-4">
        <li>{t('requiredInformation.scholarshipInformationList.1')}</li>
        <li>{t('requiredInformation.scholarshipInformationList.2')}</li>
        <li>{t('requiredInformation.scholarshipInformationList.3')}</li>
      </ul>
    </div>
  );
};

export default ScholarshipProviderGuildelines;
