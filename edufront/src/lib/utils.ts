import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IApplication } from './schemas';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mapProfileToApplication = (profile: ProfileApiResponse): Partial<IApplication> => {
  const { customer, applicantProfile } = profile;

  // Get current education history (most recent)
  const currentEducation = applicantProfile?.educationHistories?.[0];

  // Map skills array to string
  const skillsString =
    applicantProfile?.skills
      ?.map((skill) => `${skill.skillName} (${skill.proficiencyLevel})`)
      .join(', ') || '';

  // Map achievements and activities
  const achievements = [
    applicantProfile?.certificates
      ?.map((cert) => `${cert.certificateName} - ${cert.issuedBy}`)
      .join('; '),
    applicantProfile?.researchExperience,
  ]
    .filter(Boolean)
    .join(', ');

  const extracurricular = [
    applicantProfile?.favoriteActivities,
    applicantProfile?.sportsParticipated,
    applicantProfile?.studentActivities,
    applicantProfile?.organizationsJoined,
  ]
    .filter(Boolean)
    .join(', ');

  // Format graduation year
  const graduationYear = currentEducation?.graduationYear
    ? String(currentEducation.graduationYear)
    : '';

  return {
    fullName:
      applicantProfile?.firstName && applicantProfile?.lastName
        ? `${applicantProfile.firstName} ${applicantProfile.lastName}`
        : customer?.firstName && customer?.lastName
          ? `${customer.firstName} ${customer.lastName}`
          : customer?.username || '',
    email: customer?.email || '',
    phone: applicantProfile?.phoneNumber || '',
    address: applicantProfile?.hometown || '',
    nationality: applicantProfile?.hometown || '',
    educationLevel: currentEducation?.degreeType || '',
    schoolName: currentEducation?.institutionName || '',
    major: currentEducation?.majorName || '',
    gpa: currentEducation?.gpa || applicantProfile?.overallGpa || 0,
    graduationYear,
    skills: skillsString,
    achievements: achievements || '',
    extracurricular: extracurricular || '',
  };
};
