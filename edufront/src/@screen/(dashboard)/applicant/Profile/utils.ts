/**
 * Calculate profile completion percentage based on filled fields
 */
export function calculateProfileStrength(profile: ProfileApiResponse): number {
  const applicant = profile.applicantProfile;
  if (!applicant) return 0;

  // Weighted fields configuration
  // Arrays and complex objects can be weighted higher
  let filledFields = 0;
  let totalPossible = 0;

  const checkField = (field: any, weight: number = 1) => {
    totalPossible += weight;
    if (field !== undefined && field !== null && field !== '') {
      if (Array.isArray(field)) {
        if (field.length > 0) filledFields += weight;
      } else if (typeof field === 'number') {
        // For numbers like scores or counts, 0 might be valid or invalid depending on context
        // Assuming > 0 for scores/counts implies "filled" for completeness in this context,
        // but for publicationCount 0 is a valid "filing".
        // Let's stick to existence (not undefined/null) for non-optional numbers,
        // but often default is 0.
        // We will increment if it serves the profile strength (usually positive info).
        if (field > 0) filledFields += weight;
      } else if (typeof field === 'boolean') {
        // For boolean like militaryFamilyHistory, if it's strictly true/false it's filled.
        filledFields += weight;
      } else {
        filledFields += weight;
      }
    }
  };

  // 1. Basic Info
  checkField(applicant.firstName);
  checkField(applicant.lastName);
  checkField(applicant.contactName);
  checkField(applicant.phoneNumber);
  checkField(profile.customer?.email);

  // 2. Personal Info & Demographics
  checkField(applicant.religion);
  checkField(applicant.hometown);
  checkField(applicant.citizenshipStatus);
  checkField(applicant.ethnicity);
  checkField(applicant.race);
  checkField(applicant.languages);
  checkField(applicant.militaryFamilyHistory);

  // 3. Academic
  checkField(applicant.educationLevel);
  checkField(applicant.overallGpa);
  checkField(applicant.academicAwards);
  checkField(applicant.publicationCount);
  checkField(applicant.educationHistories, 2); // Higher weight for lists
  checkField(applicant.intentions, 2);

  // 4. Test Scores (Each score adds to strength)
  checkField(applicant.satScore);
  checkField(applicant.actScore);
  checkField(applicant.greScore);
  checkField(applicant.gmatScore);
  checkField(applicant.toeflScore);
  checkField(applicant.ieltsScore);

  // 5. Activities
  checkField(applicant.favoriteActivities);
  checkField(applicant.sportsParticipated);
  checkField(applicant.studentActivities);
  checkField(applicant.organizationsJoined);
  checkField(applicant.extracurricularActivities);

  // 6. Experience & Career
  checkField(applicant.researchExperience);
  checkField(applicant.careerGoals);
  checkField(applicant.researchInterest);

  // 7. Skills & Certs
  checkField(applicant.skills, 2);
  checkField(applicant.certificates, 2);

  // 8. Background
  checkField(applicant.disabilities);
  checkField(applicant.medicalConditions);

  // 9. Preferences (Excluding applicantPreferences array as requested)
  checkField(applicant.preferredScholarshipType);
  checkField(applicant.preferredCountry);
  checkField(applicant.preferredMajor);

  if (totalPossible === 0) return 0;

  return Math.round((filledFields / totalPossible) * 100);
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
