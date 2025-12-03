import { CustomFormField } from '@/lib/cus/CustomFormField';
import { useTranslations } from 'next-intl';
import React from 'react';
import {
  FAVORITE_ACTIVITIES,
  ORGANIZATIONS_JOINED,
  STUDENT_ACTIVITIES,
  SPORTS_PARTICIPATED,
  RESEARCH_EXPERIENCE,
  CAREER_GOALS,
} from '../../Profile/constants';
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
          type="multi-select"
          placeholder={t('favoriteActivitiesPlaceholder')}
          options={FAVORITE_ACTIVITIES}
          labelClassName="w-40"
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.sportsParticipated"
          label={t('sportsParticipated')}
          type="multi-select"
          placeholder={t('sportsParticipatedPlaceholder')}
          options={SPORTS_PARTICIPATED}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.studentActivities"
          label={t('studentActivities')}
          type="multi-select"
          placeholder={t('studentActivitiesPlaceholder')}
          options={STUDENT_ACTIVITIES}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.organizationsJoined"
          label={t('organizationsJoined')}
          type="multi-select"
          placeholder={t('organizationsJoinedPlaceholder')}
          options={ORGANIZATIONS_JOINED}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.researchExperience"
          label={t('researchExperience')}
          type="multi-select"
          placeholder={t('researchExperiencePlaceholder')}
          options={RESEARCH_EXPERIENCE}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.careerGoals"
          label={t('careerGoals')}
          type="multi-select"
          placeholder={t('careerGoalsPlaceholder')}
          options={CAREER_GOALS}
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
