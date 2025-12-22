import { CustomFormField } from '@/pattern/cus/CustomFormField';
import { useTranslations } from 'next-intl';
import React from 'react';

import Header from '@/pattern/share/Header';

const Activities = () => {
  const t = useTranslations('applicantProfile.activitiesDialog');

  return (
    <div className="space-y-4">
      <Header subtitle={t('description')} title={t('title')} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomFormField
          name="applicantProfile.favoriteActivities"
          label={t('favoriteActivities')}
          placeholder={t('favoriteActivitiesPlaceholder')}
          labelClassName="w-40"
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.sportsParticipated"
          label={t('sportsParticipated')}
          placeholder={t('sportsParticipatedPlaceholder')}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.studentActivities"
          label={t('studentActivities')}
          placeholder={t('studentActivitiesPlaceholder')}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.organizationsJoined"
          label={t('organizationsJoined')}
          placeholder={t('organizationsJoinedPlaceholder')}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.researchExperience"
          label={t('researchExperience')}
          placeholder={t('researchExperiencePlaceholder')}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.careerGoals"
          label={t('careerGoals')}
          placeholder={t('careerGoalsPlaceholder')}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.researchInterest"
          label={t('researchInterest')}
          type="textarea"
          placeholder={t('researchInterestPlaceholder')}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.extracurricularActivities"
          label={t('extracurricularActivities')}
          type="textarea"
          placeholder={t('extracurricularActivitiesPlaceholder')}
          inlineLabel
          isBorder
        />
      </div>
    </div>
  );
};

export default Activities;
