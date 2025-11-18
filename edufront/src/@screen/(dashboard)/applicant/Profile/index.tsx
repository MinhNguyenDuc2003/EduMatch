'use client';

import React, { useEffect, useState } from 'react';
import {
  ProfileHeader,
  ProfileStrength,
  InfoCard,
  ArrayInfoCard,
  ProfileSkeleton,
} from './components';
import { transformProfileData } from './utils';
import Certificates from './components/Certificates';
import Intentions from './components/Intentions';
import HistoryCard from './components/HistoryCard';
import SkillCard from './components/SkillCard';
import PreferenceCard from './components/PreferenceCard';

import BreadcrumbHeader from '@/pattern/core/BreadcrumbHeader';
import { applicantProfileSchema, IApplicantProfile } from '@/lib/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_PROFILE_FORM_VALUES } from './constants';
import {
  useGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
} from '@/state/apiApplicant';
import { useTranslations } from 'next-intl';

export default function Profile() {
  const t = useTranslations('homepage.applicantProfile');

  // RTK Query hooks
  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery();

  if (isLoadingProfile || !profileData) {
    return <ProfileSkeleton />;
  }

  const uiData = transformProfileData(profileData);
  const { customer, applicantProfile } = profileData;

  return (
    <>
      {/* Breadcrumb Navigation */}
      <BreadcrumbHeader
        items={[
          { label: t('breadcrumb.applicant'), href: '/applicant' },
          { label: t('breadcrumb.profile') },
        ]}
      />

      <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-40">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Profile Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
            <div className="lg:col-span-2">
              <ProfileHeader
                name={uiData.name}
                role={uiData.role}
                avatarUrl={uiData.avatarUrl}
                stats={uiData.stats}
              />
            </div>

            <ProfileStrength percentage={uiData.profileStrength} />
          </div>

          {/* Grid Layout for Profile Strength and Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-4 gap-6 auto-rows-fr ">
            {/* Columns 1 - Student Info */}
            <InfoCard
              title={t('sections.studentInformation')}
              fields={[
                {
                  label: t('fields.contactName'),
                  value: applicantProfile?.contactName,
                },
                {
                  label: t('fields.firstName'),
                  value: applicantProfile?.firstName,
                },
                {
                  label: t('fields.lastName'),
                  value: applicantProfile?.lastName,
                },
                {
                  label: t('fields.phoneNumber'),
                  value: applicantProfile?.phoneNumber,
                },
                {
                  label: t('fields.overallGpa'),
                  value: applicantProfile?.overallGpa
                    ? applicantProfile.overallGpa.toFixed(2)
                    : undefined,
                },
                {
                  label: t('fields.hometown'),
                  value: applicantProfile?.hometown,
                },
                {
                  label: t('fields.citizenshipStatus'),
                  value: applicantProfile?.citizenshipStatus,
                },
                {
                  label: t('fields.race'),
                  value: applicantProfile?.race,
                },
                {
                  label: t('fields.ethnicity'),
                  value: applicantProfile?.ethnicity,
                },
                {
                  label: t('fields.religion'),
                  value: applicantProfile?.religion,
                },
                {
                  label: t('fields.militaryFamilyHistory'),
                  value:
                    applicantProfile?.militaryFamilyHistory !== undefined
                      ? applicantProfile.militaryFamilyHistory
                        ? t('fields.yes')
                        : t('fields.no')
                      : undefined,
                },
                {
                  label: t('fields.disabilities'),
                  value: applicantProfile?.disabilities,
                },
                {
                  label: t('fields.medicalConditions'),
                  value: applicantProfile?.medicalConditions,
                },
              ]}
              className="lg:row-span-4"
            />

            {/* Columns 2 - Academic Info and Artistic/Athletic Information */}

            {/* Row 1 - Academic Info */}
            <InfoCard
              title={t('sections.interestsActivities')}
              fields={[
                {
                  label: t('fields.artMusicTheater'),
                  value: applicantProfile?.favoriteActivities,
                },
                {
                  label: t('fields.sportsParticipated'),
                  value: applicantProfile?.sportsParticipated,
                },
                {
                  label: t('fields.studentActivities'),
                  value: applicantProfile?.studentActivities,
                },
                {
                  label: t('fields.organizationsJoined'),
                  value: applicantProfile?.organizationsJoined,
                },
                {
                  label: t('fields.careerGoals'),
                  value: applicantProfile?.careerGoals,
                },
                {
                  label: t('fields.researchExperience'),
                  value: applicantProfile?.researchExperience,
                },
              ]}
              className="lg:row-span-2"
            />

            {/* Applicant Preferences Section */}
            <ArrayInfoCard
              title={t('sections.applicantPreferences')}
              items={applicantProfile?.applicantPreferences}
              renderItem={(preference) => <PreferenceCard preference={preference} />}
              emptyMessage={t('common.noPreferencesAdded')}
              className="lg:col-start-2 lg:row-start-3 "
            />

            <InfoCard
              title={t('sections.accountSettings')}
              fields={[
                {
                  label: t('fields.emailAddress'),
                  value: customer?.email,
                },
                {
                  label: t('fields.password'),
                  value: '•••••••••',
                },
              ]}
              className="lg:col-start-2 lg:row-start-4"
            />
            <ArrayInfoCard
              title={t('sections.educationHistory')}
              items={applicantProfile?.educationHistories}
              renderItem={(edu) => <HistoryCard edu={edu} />}
              emptyMessage={t('common.noEducationHistoryAdded')}
              className="lg:col-start-3 lg:row-start-1 lg:row-span-2"
            />

            <ArrayInfoCard
              title={t('sections.skills')}
              items={applicantProfile?.skills}
              renderItem={(skill) => <SkillCard skill={skill} />}
              emptyMessage={t('common.noSkillsAdded')}
              className="lg:col-start-3 lg:row-start-3 lg:row-span-2"
            />
          </div>

          <Certificates certificates={applicantProfile?.certificates || []} />
          <Intentions intentions={applicantProfile?.intentions || []} />
        </div>
      </div>
    </>
  );
}
