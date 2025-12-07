/**
 * Calculate profile completion percentage based on filled fields
 */
export function calculateProfileStrength(profile: ProfileApiResponse): number {
  const applicant = profile.applicantProfile;
  if (!applicant) return 0;

  const totalFields = 30; // Total important fields to track
  let filledFields = 0;

  // Basic info
  if (applicant.firstName) filledFields++;
  if (applicant.lastName) filledFields++;
  if (applicant.contactName) filledFields++;
  if (profile.customer?.email) filledFields++;

  // Personal info
  if (applicant.religion) filledFields++;
  if (applicant.hometown) filledFields++;
  if (applicant.citizenshipStatus) filledFields++;
  if (applicant.ethnicity) filledFields++;
  if (applicant.race) filledFields++;

  // Academic
  if (applicant.overallGpa) filledFields++;
  if (applicant.educationHistories?.length > 0) filledFields += 2;
  if (applicant.intentions?.length > 0) filledFields += 2;

  // Activities
  if (applicant.favoriteActivities) filledFields++;
  if (applicant.sportsParticipated) filledFields++;
  if (applicant.studentActivities) filledFields++;
  if (applicant.organizationsJoined) filledFields++;

  // Skills & Experience
  if (applicant.skills?.length > 0) filledFields += 2;
  if (applicant.researchExperience) filledFields++;
  if (applicant.careerGoals) filledFields++;
  if (applicant.certificates?.length > 0) filledFields += 2;

  // Background
  if (applicant.disabilities) filledFields++;
  if (applicant.medicalConditions) filledFields++;

  return Math.round((filledFields / totalFields) * 100);
}

/**
 * Transform API response to UI-friendly ProfileData
 */
export function transformProfileData(apiResponse: ProfileApiResponse): ProfileData {
  const { customer, applicantProfile } = apiResponse;

  const fullName =
    applicantProfile?.firstName && applicantProfile?.lastName
      ? `${applicantProfile.firstName} ${applicantProfile.lastName}`
      : customer?.firstName && customer?.lastName
        ? `${customer.firstName} ${customer.lastName}`
        : customer?.username || 'User';

  // Get current education or intention for role
  const currentEducation = applicantProfile?.educationHistories?.[0];
  const intention = applicantProfile?.intentions?.[0];

  let role = 'Student';
  if (intention?.academicClassification) {
    role = intention.academicClassification;
  } else if (currentEducation?.degreeType) {
    role = `${currentEducation.degreeType} Student`;
  }

  return {
    name: fullName,
    role,
    avatarUrl: undefined, // Add avatar URL when available from API
    stats: {
      matchedScholarships: 0, // These should come from another API endpoint
      matchedResearchOpportunities: 0,
      scholarshipAmount: '$0',
    },
    profileStrength: calculateProfileStrength(apiResponse),
  };
}

/**
 * Get primary address
 */
export function getPrimaryAddress(
  addresses?: Array<{ city: string; stateOrProvinceName: string; countryName: string }>
): string {
  if (!addresses || addresses.length === 0) return '';
  const addr = addresses[0];
  return `${addr.city}, ${addr.stateOrProvinceName}, ${addr.countryName}`;
}

/**
 * Format date string to readable format
 */
export function formatDate(dateInput?: string | number): string {
  if (dateInput === undefined || dateInput === null || dateInput === '') return '';
  const asNumber = typeof dateInput === 'string' ? Number(dateInput) : dateInput;
  const timestamp = !isNaN(asNumber as number)
    ? // Detect seconds vs milliseconds (treat < 10^12 as seconds)
      (asNumber as number) < 1e12
      ? (asNumber as number) * 1000
      : (asNumber as number)
    : Date.parse(String(dateInput));
  const date = new Date(timestamp);
  return date.toLocaleDateString('vi-VN', { month: 'short', day: 'numeric', year: 'numeric' });
}
