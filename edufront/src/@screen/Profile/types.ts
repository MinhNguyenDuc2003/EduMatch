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
  issueDate: string;
  expiryDate: string;
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
  enrollmentStartDate: string;
  enrollmentEndDate: string;
  graduationYear: number;
  isDualEnrolled: boolean;
  isTransfer: boolean;
  isReturningStudent: boolean;
  notes: string;
}

export interface PhoneNumber {
  id: number;
  applicantId: number;
  phoneType: string;
  countryCode: string;
  phoneNumber: string;
  isInternational: boolean;
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
  expectedStartDate: string;
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
  phoneNumbers: PhoneNumber[];
  skills: Skill[];
  intentions: Intention[];
}

export interface Address {
  id: number;
  contactName: string;
  phone: string;
  addressLine1: string;
  city: string;
  zipCode: string;
  districtId: number;
  districtName: string;
  stateOrProvinceId: number;
  stateOrProvinceName: string;
  countryId: number;
  countryName: string;
  isActive: boolean;
}

export interface AddressPostVm {
  contactName: string;
  phone: string;
  addressLine1: string;
  city: string;
  zipCode: string;
  districtId: number;
  stateOrProvinceId: number;
  countryId: number;
  id: number;
}

export interface ProfileApiResponse {
  customer: Customer;
  applicantProfile?: ApplicantProfile;
  providerProfile: null;
  addresses: Address[];
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

export interface Country {
  id: number;
  code2: string;
  name: string;
  code3: string;
  isBillingEnabled: boolean;
  isShippingEnabled: boolean;
  isCityEnabled: boolean;
  isZipCodeEnabled: boolean;
  isDistrictEnabled: boolean;
}

export interface StateOrProvince {
  id: number;
  name: string;
  code: string;
  type: string;
  countryId: number;
}

export interface District {
  id: number;
  name: string;
}
