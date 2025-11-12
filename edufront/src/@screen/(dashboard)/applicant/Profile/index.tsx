'use client';

import React, { useEffect, useState } from 'react';
import {
  ProfileHeader,
  ProfileStrength,
  InfoCard,
  ArrayInfoCard,
  StudentInformationDialog,
  SkillsDialog,
  EducationHistoryDialog,
  CertificatesDialog,
  IntentionsDialog,
  ActivitiesDialog,
  ProfileSkeleton,
} from './components';
import { transformProfileData } from './utils';
import Certificates from './components/Certificates';
import Intentions from './components/Intentions';
import HistoryCard from './components/HistoryCard';
import SkillCard from './components/SkillCard';
import PreferenceCard from './components/PreferenceCard';
import Header from '@/pattern/core/Navbar';
import Footer from '@/pattern/core/Footer';
import BreadcrumbHeader from '@/pattern/core/BreadcrumbHeader';
import { Form } from '@/lib/cus/form';
import { applicantProfileSchema, IApplicantProfile } from '@/lib/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_PROFILE_FORM_VALUES } from './constants';
import {
  useGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
} from '@/state/apiApplicant';

export default function Profile() {
  const [isStudentInfoDialogOpen, setIsStudentInfoDialogOpen] = useState(false);
  const [isSkillsDialogOpen, setIsSkillsDialogOpen] = useState(false);
  const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false);
  const [isCertificatesDialogOpen, setIsCertificatesDialogOpen] = useState(false);
  const [isIntentionsDialogOpen, setIsIntentionsDialogOpen] = useState(false);
  const [isActivitiesDialogOpen, setIsActivitiesDialogOpen] = useState(false);
  const [isPreferencesDialogOpen, setIsPreferencesDialogOpen] = useState(false);

  // RTK Query hooks
  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery();
  const [createProfile] = useCreateProfileMutation();
  const [updateProfile] = useUpdateProfileMutation();

  // Form setup
  const methods = useForm<IApplicantProfile>({
    reValidateMode: 'onSubmit',
    mode: 'onChange',
    resolver: zodResolver(applicantProfileSchema),
    defaultValues: DEFAULT_PROFILE_FORM_VALUES,
  });

  // Reset form when profile data is loaded
  useEffect(() => {
    if (profileData) {
      const formData = {
        applicantProfile: {
          ...DEFAULT_PROFILE_FORM_VALUES.applicantProfile,
          ...profileData.applicantProfile,
        },
      };
      methods.reset(formData);
    }
  }, [profileData, methods]);

  const handleEdit = (section: string) => {
    if (section === 'personal') {
      setIsStudentInfoDialogOpen(true);
    } else if (section === 'skills') {
      setIsSkillsDialogOpen(true);
    } else if (section === 'education-add') {
      setIsEducationDialogOpen(true);
    } else if (section === 'certificate-add') {
      setIsCertificatesDialogOpen(true);
    } else if (section === 'intention-add') {
      setIsIntentionsDialogOpen(true);
    } else if (section === 'activities') {
      setIsActivitiesDialogOpen(true);
    } else if (section === 'preferences') {
      setIsPreferencesDialogOpen(true);
    }
  };

  const handleStudentInfoSubmit = async (data: IApplicantProfile) => {
    try {
      // Call API to update or create student info
      if (profileData?.applicantProfile) {
        await updateProfile(data).unwrap();
      } else {
        await createProfile(data).unwrap();
      }
    } catch (error) {
      console.log('Error updating student info:', error);
      throw error;
    }
  };

  const handleStudentInfoCancel = () => {
    if (profileData) {
      const formData = {
        applicantProfile: {
          ...DEFAULT_PROFILE_FORM_VALUES.applicantProfile,
          ...profileData.applicantProfile,
        },
      };
      methods.reset(formData);
    }
  };

  if (isLoadingProfile || !profileData) {
    return <ProfileSkeleton />;
  }

  const uiData = transformProfileData(profileData);
  const { customer, applicantProfile } = profileData;

  return (
    <Form {...methods}>
      {/* Breadcrumb Navigation */}
      <BreadcrumbHeader
        items={[{ label: 'Applicant', href: '/applicant' }, { label: 'Profile' }]}
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
              title="Student Information"
              fields={[
                {
                  label: 'Contact Name',
                  value: applicantProfile?.contactName,
                },
                {
                  label: 'First Name',
                  value: applicantProfile?.firstName,
                },
                {
                  label: 'Last Name',
                  value: applicantProfile?.lastName,
                },
                {
                  label: 'Phone Number',
                  value: applicantProfile?.phoneNumber,
                },
                {
                  label: 'Overall GPA',
                  value: applicantProfile?.overallGpa
                    ? applicantProfile.overallGpa.toFixed(2)
                    : undefined,
                },
                {
                  label: 'Hometown',
                  value: applicantProfile?.hometown,
                },
                {
                  label: 'Citizenship Status',
                  value: applicantProfile?.citizenshipStatus,
                },
                {
                  label: 'Race',
                  value: applicantProfile?.race,
                },
                {
                  label: 'Ethnicity',
                  value: applicantProfile?.ethnicity,
                },
                {
                  label: 'Religion',
                  value: applicantProfile?.religion,
                },
                {
                  label: 'Military Family History',
                  value:
                    applicantProfile?.militaryFamilyHistory !== undefined
                      ? applicantProfile.militaryFamilyHistory
                        ? 'Yes'
                        : 'No'
                      : undefined,
                },
                {
                  label: 'Disabilities',
                  value: applicantProfile?.disabilities,
                },
                {
                  label: 'Medical Conditions',
                  value: applicantProfile?.medicalConditions,
                },
              ]}
              onEdit={() => handleEdit('personal')}
              className="lg:row-span-4"
            />

            {/* Columns 2 - Academic Info and Artistic/Athletic Information */}

            {/* Row 1 - Academic Info */}
            <InfoCard
              title="Interests & Activities"
              fields={[
                {
                  label: 'Art/Music/Theater',
                  value: applicantProfile?.favoriteActivities,
                },
                {
                  label: 'Sports Participated',
                  value: applicantProfile?.sportsParticipated,
                },
                {
                  label: 'Student Activities',
                  value: applicantProfile?.studentActivities,
                },
                {
                  label: 'Organizations Joined',
                  value: applicantProfile?.organizationsJoined,
                },
                {
                  label: 'Career Goals',
                  value: applicantProfile?.careerGoals,
                },
                {
                  label: 'Research Experience',
                  value: applicantProfile?.researchExperience,
                },
              ]}
              onEdit={() => handleEdit('activities')}
              className="lg:row-span-2"
            />

            {/* Applicant Preferences Section */}
            <ArrayInfoCard
              title="Applicant Preferences"
              items={applicantProfile?.applicantPreferences}
              onEdit={() => handleEdit('preferences')}
              renderItem={(preference) => <PreferenceCard preference={preference} />}
              emptyMessage="No preferences added"
              className="lg:col-start-2 lg:row-start-3 "
            />

            <InfoCard
              title="Account Settings"
              fields={[
                {
                  label: 'Email Address',
                  value: customer?.email,
                },
                {
                  label: 'Password',
                  value: '•••••••••',
                },
              ]}
              onEdit={() => handleEdit('account')}
              className="lg:col-start-2 lg:row-start-4"
            />
            <ArrayInfoCard
              title="Education History"
              items={applicantProfile?.educationHistories}
              onEdit={() => handleEdit('education-add')}
              renderItem={(edu) => <HistoryCard edu={edu} />}
              emptyMessage="No education history added"
              className="lg:col-start-3 lg:row-start-1 lg:row-span-2"
            />

            <ArrayInfoCard
              title="Skills"
              items={applicantProfile?.skills}
              onEdit={() => handleEdit('skills')}
              renderItem={(skill) => <SkillCard skill={skill} />}
              emptyMessage="No skills added"
              className="lg:col-start-3 lg:row-start-3 lg:row-span-2"
            />
          </div>

          <Certificates
            certificates={applicantProfile?.certificates || []}
            onEdit={() => handleEdit('certificate-add')}
          />
          <Intentions
            intentions={applicantProfile?.intentions || []}
            onEdit={() => handleEdit('intention-add')}
          />
        </div>
      </div>

      {/* Student Information Dialog */}
      <StudentInformationDialog
        open={isStudentInfoDialogOpen}
        onOpenChange={setIsStudentInfoDialogOpen}
        onSubmit={handleStudentInfoSubmit}
        onCancel={handleStudentInfoCancel}
      />

      {/* Skills Dialog */}
      <SkillsDialog
        open={isSkillsDialogOpen}
        onOpenChange={setIsSkillsDialogOpen}
        onSubmit={handleStudentInfoSubmit}
        onCancel={handleStudentInfoCancel}
      />

      {/* Education History Dialog */}
      <EducationHistoryDialog
        open={isEducationDialogOpen}
        onOpenChange={setIsEducationDialogOpen}
        onSubmit={handleStudentInfoSubmit}
        onCancel={handleStudentInfoCancel}
      />

      {/* Certificates Dialog */}
      <CertificatesDialog
        open={isCertificatesDialogOpen}
        onOpenChange={setIsCertificatesDialogOpen}
        onSubmit={handleStudentInfoSubmit}
        onCancel={handleStudentInfoCancel}
      />

      {/* Intentions Dialog */}
      <IntentionsDialog
        open={isIntentionsDialogOpen}
        onOpenChange={setIsIntentionsDialogOpen}
        onSubmit={handleStudentInfoSubmit}
        onCancel={handleStudentInfoCancel}
      />

      {/* Activities Dialog */}
      <ActivitiesDialog
        open={isActivitiesDialogOpen}
        onOpenChange={setIsActivitiesDialogOpen}
        onSubmit={handleStudentInfoSubmit}
        onCancel={handleStudentInfoCancel}
      />
    </Form>
  );
}
