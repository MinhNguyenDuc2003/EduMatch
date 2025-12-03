declare global {
  // API Response Types

  interface Certificate {
    id: number;
    applicantId: number;
    certificateName: string;
    issuedBy: string;
    issueDate: number | string;
    expiryDate: number | string;
    score: string;
  }

  interface EducationHistory {
    id: number;
    applicantId: number;
    institutionName: string;
    institutionType: string;
    state: string;
    country: string;
    degreeType: string;
    majorCategory: string;
    majorName: string;
    gpa: number;
    classRank: string;
    classSize: number;
    enrollmentStartDate: number | string;
    enrollmentEndDate: number | string;
    graduationYear: number;
    isDualEnrolled: boolean;
    isTransfer: boolean;
    isReturningStudent: boolean;
    notes: string;
  }

  interface ApplicantPreference {
    id: number;
    applicantId: number;
    type: string;
    value: string;
    weight: number;
    note: string;
  }

  interface Skill {
    id: number;
    applicantId: number;
    skillName: string;
    proficiencyLevel: string;
    yearsExperience: number;
  }

  interface Intention {
    id: number;
    applicantId: number;
    intendedInstitution: string;
    intendedState: string;
    intendedCountry: string;
    degreeType: string;
    intendedMajorCategory: string;
    intendedMajorName: string;
    academicClassification: string;
    expectedStartDate: number | string;
    expectedGraduationYear: number;
    isTransferStudent: boolean;
    isReturningStudent: boolean;
    notes: string;
  }

  interface ApplicantProfile {
    id: number;
    userId: string;
    contactName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    religion: string;
    hometown: string;
    citizenshipStatus: string;
    ethnicity: string;
    race: string;
    militaryFamilyHistory: boolean;
    disabilities: string;
    medicalConditions: string;
    favoriteActivities: string;
    sportsParticipated: string;
    studentActivities: string;
    organizationsJoined: string;
    researchExperience: string;
    careerGoals: string;
    overallGpa: number;
    educationLevel: string;
    satScore: number;
    actScore: number;
    toeflScore: number;
    ieltsScore: number;
    greScore: number;
    languages: string;
    academicAwards: string;
    publicationCount: number;
    researchInterest: string;
    extracurricularActivities: string;
    preferredScholarshipType: string;
    preferredCountry: string;
    preferredUniversity: string;
    certificates: Certificate[];
    educationHistories: EducationHistory[];
    applicantPreferences: ApplicantPreference[];
    skills: Skill[];
    intentions: Intention[];
    score?: number;
    note?: string;
  }

  interface ProfileApiResponse {
    customer: Customer;
    applicantProfile?: ApplicantProfile;
    providerProfile: null;
  }

  // UI Component Types
  interface ProfileStats {
    matchedScholarships: number;
    matchedResearchOpportunities: number;
    scholarshipAmount: string;
  }

  interface ProfileData {
    name: string;
    role: string;
    avatarUrl?: string;
    stats: ProfileStats;
    profileStrength: number;
  }

  interface FavouriteApplicant {
    id: number;
    userId: string;
    applicantId: number;
    note?: string;
    applicantProfileVo?: ApplicantProfile;
  }
}

export {};
