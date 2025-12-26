import { CustomFormField } from '@/pattern/cus/CustomFormField';
import Header from '@/pattern/share/Header';
import { useTranslations } from 'next-intl';
import React from 'react';
import { SCHOLARSHIP_TYPES, COUNTRIES, MAJOR_NAMES } from '@/constants/Common';
import { University } from '@/constants/University';

const PreferredPreferences = ({ profile }: { profile?: ApplicantProfile }) => {
  const t = useTranslations('applicantProfile.preferencesDialog');
  const universityOptions = University.map((university) => ({
    value: university.value,
    label: university.label,
  }));

  return (
    <div className="space-y-4">
      <Header subtitle={t('preferredPreferencesDescription')} title={t('preferredPreferences')} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomFormField
          name="applicantProfile.preferredScholarshipType"
          label={t('preferredScholarshipType')}
          type="select"
          placeholder={t('selectPreferredScholarshipType')}
          options={SCHOLARSHIP_TYPES}
          initialValue={profile?.preferredScholarshipType}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.preferredCountry"
          label={t('preferredCountry')}
          type="select"
          placeholder={t('selectPreferredCountry')}
          options={COUNTRIES}
          initialValue={profile?.preferredCountry}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.preferredMajor"
          label={t('preferredMajor')}
          type="select"
          placeholder={t('selectPreferredMajor')}
          options={MAJOR_NAMES}
          initialValue={profile?.preferredMajor}
          inlineLabel
          isBorder
          className="md:col-span-2"
        />
      </div>
    </div>
  );
};

export default PreferredPreferences;
