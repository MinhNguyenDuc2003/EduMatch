'use client';

import React, { useEffect, useState } from 'react';
import {
  ProfileHeader,
  ProfileStrength,
  InfoCard,
  ArrayInfoCard,
  StudentInformationDialog,
} from './components';
import { transformProfileData } from './utils';
import Certificates from './components/Certificates';
import Intentions from './components/Intentions';
import HistoryCard from './components/HistoryCard';
import SkillCard from './components/SkillCard';
import Header from '@/pattern/core/Header';
import Footer from '@/pattern/core/Footer';
import Context from './seg/context';
import { Form } from '@/lib/cus/form';
import { IProfileForm } from '@/lib/schemas';

export default function Profile() {
  const [isStudentInfoDialogOpen, setIsStudentInfoDialogOpen] = useState(false);

  const handleEdit = (section: string) => {
    console.log(`Edit ${section}`);
    if (section === 'personal') {
      setIsStudentInfoDialogOpen(true);
    }
    // Implement edit functionality for other sections here
  };

  const handleStudentInfoCancel = () => {
    console.log('Student Information cancelled');
    // Handle cancellation here
  };

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss, methods, meds }) => {
          const profileData = ss.Applicant.ApplicantProfile;

          const handleStudentInfoSubmit = (data: IProfileForm) => {
            // console.log('Student Information submitted:', data);
            // Handle form submission here
            meds.onUpdateStudentInfo(data);
          };

          if (!profileData) {
            return (
              <>
                <Header />
                <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 lg:px-40">
                  <div className="text-center">
                    <p className="text-gray-500">Loading profile data...</p>
                  </div>
                </div>
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
                      onEdit={() => handleEdit('skill-add')}
                      renderItem={(skill) => <SkillCard skill={skill} />}
                      emptyMessage="No skills added"
                      className="lg:col-start-3 lg:row-start-3 lg:row-span-2"
                    />
                  </div>

                  <Certificates certificates={applicantProfile?.certificates || []} />
                  <Intentions intentions={applicantProfile?.intentions || []} />
                </div>
              </div>

              <Footer />

              {/* Student Information Dialog */}
              <StudentInformationDialog
                open={isStudentInfoDialogOpen}
                onOpenChange={setIsStudentInfoDialogOpen}
                onSubmit={handleStudentInfoSubmit}
                onCancel={handleStudentInfoCancel}
              />
            </Form>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}
