import {
  CITIZENSHIP_STATUS,
  COUNTRIES,
  ETHNICITIES,
  RACES,
  RELIGIONS,
  STUDY_LEVELS,
} from '@/constants/Common';
import { CustomFormField } from '@/pattern/cus/CustomFormField';
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
          name="applicantProfile.educationLevel"
          label={tFields('educationLevel')}
          type="select"
          placeholder={t('selectEducationLevel')}
          options={STUDY_LEVELS}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.satScore"
          label={tFields('satScore')}
          type="number"
          placeholder={tFields('satScorePlaceholder')}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.actScore"
          label={tFields('actScore')}
          type="number"
          placeholder={tFields('actScorePlaceholder')}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.toeflScore"
          label={tFields('toeflScore')}
          type="number"
          placeholder={tFields('toeflScorePlaceholder')}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.ieltsScore"
          label={tFields('ieltsScore')}
          type="number"
          placeholder={tFields('ieltsScorePlaceholder')}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.greScore"
          label={tFields('greScore')}
          type="number"
          placeholder={tFields('greScorePlaceholder')}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.languages"
          label={tFields('languages')}
          placeholder={tCommon('addInfo')}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.academicAwards"
          label={tFields('academicAwards')}
          type="textarea"
          placeholder={tCommon('addInfo')}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.publicationCount"
          label={tFields('publicationCount')}
          type="number"
          placeholder="0"
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
