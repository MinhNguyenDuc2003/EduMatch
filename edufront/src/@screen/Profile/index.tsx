'use client';

import React, { useEffect, useState } from 'react';
import {
  ProfileHeader,
  ProfileStrength,
  InfoCard,
  ArrayInfoCard,
  StudentInformationDialog,
  SkillsDialog,
  PhoneNumbersDialog,
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
import Header from '@/pattern/core/Header';
import Footer from '@/pattern/core/Footer';
import { Form } from '@/lib/cus/form';
import { applicantProfileSchema, IApplicantProfile } from '@/lib/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_PROFILE_FORM_VALUES } from './constants';
import {
  useGetProfileQuery,
  useGetCountriesQuery,
  useGetStateOrProvincesQuery,
  useGetDistrictsQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
} from '@/state/apiApplicant';

export default function Profile() {
  const [isStudentInfoDialogOpen, setIsStudentInfoDialogOpen] = useState(false);
  const [isSkillsDialogOpen, setIsSkillsDialogOpen] = useState(false);
  const [isPhonesDialogOpen, setIsPhonesDialogOpen] = useState(false);
  const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false);
  const [isCertificatesDialogOpen, setIsCertificatesDialogOpen] = useState(false);
  const [isIntentionsDialogOpen, setIsIntentionsDialogOpen] = useState(false);
  const [isActivitiesDialogOpen, setIsActivitiesDialogOpen] = useState(false);

  // RTK Query hooks
  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery();
  const { data: countries } = useGetCountriesQuery();
  const [createProfile] = useCreateProfileMutation();
  const [updateProfile] = useUpdateProfileMutation();

  // Form setup
  const methods = useForm<IApplicantProfile>({
    reValidateMode: 'onSubmit',
    mode: 'onChange',
    resolver: zodResolver(applicantProfileSchema),
    defaultValues: DEFAULT_PROFILE_FORM_VALUES,
  });

  // Watch for country and state selection changes
  const countryId = methods.watch('addressPostVm.countryId');
  const stateOrProvinceId = methods.watch('addressPostVm.stateOrProvinceId');

  // Lazy queries for states and districts
  const { data: statesOrProvinces } = useGetStateOrProvincesQuery(countryId, {
    skip: !countryId || countryId <= 0,
  });
  const { data: districts } = useGetDistrictsQuery(stateOrProvinceId, {
    skip: !stateOrProvinceId || stateOrProvinceId <= 0,
  });

  // Reset form when profile data is loaded
  useEffect(() => {
    if (profileData) {
      const formData = {
        applicantProfile: {
          ...DEFAULT_PROFILE_FORM_VALUES.applicantProfile,
          ...profileData.applicantProfile,
        },
        addressPostVm: {
          ...DEFAULT_PROFILE_FORM_VALUES.addressPostVm,
          ...profileData.addresses?.[0],
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
    } else if (section === 'phone-add') {
      setIsPhonesDialogOpen(true);
    } else if (section === 'education-add') {
      setIsEducationDialogOpen(true);
    } else if (section === 'certificate-add') {
      setIsCertificatesDialogOpen(true);
    } else if (section === 'intention-add') {
      setIsIntentionsDialogOpen(true);
    } else if (section === 'activities') {
      setIsActivitiesDialogOpen(true);
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
      console.error('Error updating student info:', error);
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
        addressPostVm: {
          ...DEFAULT_PROFILE_FORM_VALUES.addressPostVm,
          ...profileData.addresses?.[0],
        },
      };
      methods.reset(formData);
    }
  };

  if (isLoadingProfile || !profileData) {
    return (
      <>
        <Header />
        <ProfileSkeleton />
        <Footer />
      </>
    );
  }

  const uiData = transformProfileData(profileData);
  const { customer, applicantProfile, addresses } = profileData;

  return (
    <Form {...methods}>
      <Header />
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
                  label: 'Address',
                  value:
                    addresses && addresses.length > 0
                      ? `${addresses[0].addressLine1 || ''}, ${addresses[0].districtName || ''}, ${addresses[0].city || ''}, ${addresses[0].countryName || ''}`
                          .replace(/,\s*,/g, ',')
                          .replace(/^,\s*|,\s*$/g, '')
                      : undefined,
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

            <ArrayInfoCard
              title="Phone Numbers"
              items={applicantProfile?.phoneNumbers}
              onEdit={() => handleEdit('phone-add')}
              renderItem={(phone) => (
                <div className="space-y-1 flex justify-between">
                  <div className="text-sm font-medium text-gray-900">
                    {phone.phoneType}{' '}
                    {phone.isInternational && (
                      <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                        International
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {phone.countryCode} {phone.phoneNumber}
                  </div>
                </div>
              )}
              emptyMessage="No phone numbers added"
              className="lg:col-start-2 lg:row-start-3"
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

      <Footer />

      {/* Student Information Dialog */}
      <StudentInformationDialog
        open={isStudentInfoDialogOpen}
        onOpenChange={setIsStudentInfoDialogOpen}
        onSubmit={handleStudentInfoSubmit}
        onCancel={handleStudentInfoCancel}
        countries={countries}
        statesOrProvinces={statesOrProvinces}
        districts={districts}
      />

      {/* Skills Dialog */}
      <SkillsDialog
        open={isSkillsDialogOpen}
        onOpenChange={setIsSkillsDialogOpen}
        onSubmit={handleStudentInfoSubmit}
        onCancel={handleStudentInfoCancel}
      />

      {/* Phone Numbers Dialog */}
      <PhoneNumbersDialog
        open={isPhonesDialogOpen}
        onOpenChange={setIsPhonesDialogOpen}
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
