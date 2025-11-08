// API Response Types
export interface Customer {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Certificate {
  id: number;
  applicantId: number;
  certificateName: string;
  issuedBy: string;
  issueDate: number | string;
  expiryDate: number | string;
  score: string;
}

export interface EducationHistory {
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

export interface ApplicantPreference {
  id: number;
  applicantId: number;
  type: string;
  value: string;
  weight: number;
  note: string;
}

export interface Skill {
  id: number;
  applicantId: number;
  skillName: string;
  proficiencyLevel: string;
  yearsExperience: number;
}

export interface Intention {
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

export interface ApplicantProfile {
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
  certificates: Certificate[];
  educationHistories: EducationHistory[];
  applicantPreferences: ApplicantPreference[];
  skills: Skill[];
  intentions: Intention[];
}

export interface ProfileApiResponse {
  customer: Customer;
  applicantProfile?: ApplicantProfile;
  providerProfile: null;
}

// UI Component Types
export interface ProfileStats {
  matchedScholarships: number;
  matchedResearchOpportunities: number;
  scholarshipAmount: string;
}

export interface ProfileData {
  name: string;
  role: string;
  avatarUrl?: string;
  stats: ProfileStats;
  profileStrength: number;
}
