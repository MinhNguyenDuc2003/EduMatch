import { CITIZENSHIP_STATUS, COUNTRIES, ETHNICITIES, RACES, RELIGIONS } from '@/constants/Common';
import { CustomFormField } from '@/lib/cus/CustomFormField';
import Header from '@/pattern/share/Header';
import { useTranslations } from 'next-intl';
import React from 'react';

const StudentInformation = () => {
  const t = useTranslations('applicantProfile.studentInformationDialog');
  const tFields = useTranslations('applicantProfile.fields');
  const tCommon = useTranslations('applicantProfile.common');

  return (
    <div className="space-y-4">
      <Header subtitle={t('description')} title={t('title')} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <CustomFormField
          name="applicantProfile.firstName"
          label={tFields('firstName')}
          placeholder={tFields('firstName')}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.lastName"
          label={tFields('lastName')}
          placeholder={tFields('lastName')}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.contactName"
          label={tFields('contactName')}
          placeholder={tCommon('addInfo')}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.phoneNumber"
          label={tFields('phoneNumber')}
          placeholder="+1 234 567 8900"
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.religion"
          label={tFields('religion')}
          type="select"
          placeholder={t('selectReligion')}
          options={RELIGIONS}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.overallGpa"
          label={tFields('overallGpa')}
          type="number"
          placeholder="3.8"
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.ethnicity"
          label={tFields('ethnicity')}
          type="select"
          placeholder={t('selectEthnicity')}
          options={ETHNICITIES}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.race"
          label={tFields('race')}
          type="select"
          placeholder={t('selectRace')}
          options={RACES}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.hometown"
          label={tFields('hometown')}
          placeholder={tCommon('addInfo')}
          type="input-select"
          options={COUNTRIES}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.citizenshipStatus"
          label={tFields('citizenshipStatus')}
          type="select"
          placeholder={t('selectCitizenshipStatus')}
          options={CITIZENSHIP_STATUS}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.disabilities"
          label={tFields('disabilities')}
          placeholder={tCommon('addInfo')}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.medicalConditions"
          label={tFields('medicalConditions')}
          placeholder={tCommon('addInfo')}
          inlineLabel
          isBorder
        />
        <CustomFormField
          name="applicantProfile.militaryFamilyHistory"
          label={tFields('militaryFamilyHistory')}
          type="switch"
          className="mb-4 "
          inlineLabel
          isBorder
        />
      </div>
    </div>
  );
};

export default StudentInformation;
