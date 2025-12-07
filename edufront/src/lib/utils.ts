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
    applicantProfile?.academicAwards,
  ]
    .filter(Boolean)
    .join(', ');

  const extracurricular = [
    applicantProfile?.favoriteActivities,
    applicantProfile?.sportsParticipated,
    applicantProfile?.studentActivities,
    applicantProfile?.organizationsJoined,
    applicantProfile?.extracurricularActivities,
  ]
    .filter(Boolean)
    .join(', ');

  // Format graduation year
  const graduationYear = currentEducation?.graduationYear
    ? String(currentEducation.graduationYear)
    : '';

  // Calculate class rank percentile if available
  const classRankPercentile =
    currentEducation?.classRank && currentEducation?.classSize
      ? (parseInt(currentEducation.classRank) / currentEducation.classSize) * 100
      : undefined;

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
    citizenship: applicantProfile?.citizenshipStatus,
    educationLevel: currentEducation?.degreeType || applicantProfile?.educationLevel || '',
    schoolName: currentEducation?.institutionName || '',
    major: currentEducation?.majorName || '',
    gpa: currentEducation?.gpa || applicantProfile?.overallGpa || 0,
    graduationYear,
    skills: skillsString,
    achievements: achievements || '',
    extracurricular: extracurricular || '',
    languages: applicantProfile?.languages,
    careerGoal: applicantProfile?.careerGoals,
    researchInterest: applicantProfile?.researchInterest,
    academicAwards: applicantProfile?.academicAwards,
    publicationCount: applicantProfile?.publicationCount,
    satScore: applicantProfile?.satScore,
    actScore: applicantProfile?.actScore,
    greScore: applicantProfile?.greScore,
    toeflScore: applicantProfile?.toeflScore,
    ieltsScore: applicantProfile?.ieltsScore,
    classRank: currentEducation?.classRank ? parseInt(currentEducation.classRank) : undefined,
    classSize: currentEducation?.classSize,
    classRankPercentile,
  };
};
