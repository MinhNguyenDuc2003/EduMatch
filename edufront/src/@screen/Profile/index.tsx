'use client';

import React, { useEffect, useState } from 'react';
import { ProfileHeader, ProfileStrength, InfoCard, ArrayInfoCard } from './components';
import type { ProfileApiResponse } from './types';
import { transformProfileData, formatDate } from './utils';
import Certificates from './components/Certificates';
import apiClientService from '@/common/services/ApiClientService';
import Intentions from './components/Intentions';
import HistoryCard from './components/HistoryCard';
import SkillCard from './components/SkillCard';
import Header from '@/pattern/core/Header';
import Footer from '@/pattern/core/Footer';

export default function Profile() {
  const [profileData, setProfileData] = useState<ProfileApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const data = await apiClientService.get('/customer/storefront/customer/profile');
        // console.log(data);

        // Mock data for development
        setProfileData(mockProfileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = (section: string) => {
    console.log(`Edit ${section}`);
    // Implement edit functionality here
  };

  if (loading || !profileData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-40 flex items-center justify-center">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  const uiData = transformProfileData(profileData);
  const { customer, applicantProfile, addresses } = profileData;

  return (
    <>
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

          <Certificates certificates={applicantProfile.certificates} />
          <Intentions intentions={applicantProfile.intentions} />
        </div>
      </div>
      <Footer />
    </>
  );
}

// Mock data for development - replace with actual API call
const mockProfileData: ProfileApiResponse = {
  customer: {
    id: '1',
    username: 'phan.bich.a',
    email: 'PhanThiBichA@gmail.com',
    firstName: 'Phan Thi',
    lastName: 'Bich A',
  },
  applicantProfile: {
    id: 1,
    userId: '1',
    contactName: 'Phan Thi Bich A',
    firstName: 'Phan Thi',
    lastName: 'Bich A',
    religion: 'Buddhism',
    hometown: 'Hanoi',
    citizenshipStatus: 'International Student',
    ethnicity: 'Asian',
    race: 'Vietnamese',
    militaryFamilyHistory: false,
    disabilities: '',
    medicalConditions: 'None',
    favoriteActivities: 'Piano, Painting, Theater Club',
    sportsParticipated: 'Basketball, Swimming',
    studentActivities: 'Debate Club, Math Olympiad Team',
    organizationsJoined: 'National Honor Society, Student Council',
    researchExperience: 'AI Research Assistant at University Lab',
    careerGoals: 'Software Engineer specializing in AI and Machine Learning',
    overallGpa: 3.2,
    certificates: [
      {
        id: 1,
        applicantId: 1,
        certificateName: 'AWS Certified Developer',
        issuedBy: 'Amazon Web Services',
        issueDate: '2024-01-15T00:00:00.000Z',
        expiryDate: '2027-01-15T00:00:00.000Z',
        score: 'Pass',
      },
      {
        id: 2,
        applicantId: 1,
        certificateName: 'Google Cloud Professional',
        issuedBy: 'Google Cloud',
        issueDate: '2023-06-20T00:00:00.000Z',
        expiryDate: '2025-06-20T00:00:00.000Z',
        score: '95/100',
      },
    ],
    educationHistories: [
      {
        id: 1,
        applicantId: 1,
        institutionName: 'Rochester College',
        institutionType: 'College',
        state: 'Michigan',
        country: 'USA',
        degreeType: "Bachelor's",
        majorCategory: 'Computer Science & Engineering',
        majorName: 'Computer Science',
        gpa: 3.2,
        classRank: 'Top 15%',
        classSize: 250,
        enrollmentStartDate: '2024-09-01T00:00:00.000Z',
        enrollmentEndDate: '2028-06-01T00:00:00.000Z',
        graduationYear: 2029,
        isDualEnrolled: false,
        isTransfer: false,
        isReturningStudent: false,
        notes: "Dean's List Fall 2024",
      },
      {
        id: 2,
        applicantId: 1,
        institutionName: 'Hanoi High School for Gifted Students',
        institutionType: 'High School',
        state: 'Hanoi',
        country: 'Vietnam',
        degreeType: 'High School Diploma',
        majorCategory: 'Science',
        majorName: 'Mathematics & Computer Science',
        gpa: 3.8,
        classRank: 'Valedictorian',
        classSize: 300,
        enrollmentStartDate: '2020-09-01T00:00:00.000Z',
        enrollmentEndDate: '2024-06-01T00:00:00.000Z',
        graduationYear: 2024,
        isDualEnrolled: false,
        isTransfer: false,
        isReturningStudent: false,
        notes: 'Perfect attendance, National Math Competition Winner',
      },
    ],
    phoneNumbers: [
      {
        id: 1,
        applicantId: 1,
        phoneType: 'Mobile',
        countryCode: '+84',
        phoneNumber: '0982888860',
        isInternational: true,
      },
      {
        id: 2,
        applicantId: 1,
        phoneType: 'Home',
        countryCode: '+1',
        phoneNumber: '555-123-4567',
        isInternational: false,
      },
    ],
    skills: [
      {
        id: 1,
        applicantId: 1,
        skillName: 'JavaScript',
        proficiencyLevel: 'Advanced',
        yearsExperience: 3,
      },
      {
        id: 2,
        applicantId: 1,
        skillName: 'React',
        proficiencyLevel: 'Advanced',
        yearsExperience: 2,
      },
      {
        id: 3,
        applicantId: 1,
        skillName: 'Node.js',
        proficiencyLevel: 'Intermediate',
        yearsExperience: 2,
      },
      {
        id: 4,
        applicantId: 1,
        skillName: 'Python',
        proficiencyLevel: 'Intermediate',
        yearsExperience: 1,
      },
    ],
    intentions: [
      {
        id: 1,
        applicantId: 1,
        intendedInstitution: 'Rochester College',
        intendedState: 'Michigan',
        intendedCountry: 'USA',
        degreeType: "Bachelor's",
        intendedMajorCategory: 'Computer Science & Engineering',
        intendedMajorName: 'Computer Science with AI Specialization',
        academicClassification: 'College Freshman',
        expectedStartDate: '2024-09-01T00:00:00.000Z',
        expectedGraduationYear: 2029,
        isTransferStudent: false,
        isReturningStudent: false,
        notes: 'Planning to pursue minor in Mathematics',
      },
    ],
  },
  providerProfile: null,
  addresses: [
    {
      id: 1,
      contactName: 'Phan Thi Bich A',
      phone: '0982888860',
      addressLine1: '123 Main St',
      city: 'Hanoi',
      zipCode: '100000',
      districtId: 1,
      districtName: 'Ba Dinh',
      stateOrProvinceId: 1,
      stateOrProvinceName: 'Hanoi',
      countryId: 1,
      countryName: 'Viet Nam',
      isActive: true,
    },
  ],
  addressPostVm: {
    contactName: '',
    phone: '',
    addressLine1: '',
    city: '',
    zipCode: '',
    districtId: 0,
    stateOrProvinceId: 0,
    countryId: 0,
    id: 0,
  },
};
