// API Response Types
export interface Customer {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ProviderContact {
  id: number;
  providerId: number;
  contactName: string;
  roleTitle: string;
  email: string;
  phone: string;
  linkedinUrl: string;
}

export interface ProviderProfile {
  id: number;
  userId: string;
  organizationName: string;
  organizationType: string;
  website: string;
  email: string;
  phone: string;
  addressSummary: string;
  description: string;
  yearEstablished: number;
  accreditation: string;
  specialization: string;
  verified: boolean;
  country: string;
  providerContactDtos: ProviderContact[];
}

export interface ProviderProfileApiResponse {
  customer: Customer;
  applicantProfile: null;
  providerProfile?: ProviderProfile;
}

// UI Component Types
export interface ProviderStats {
  activeScholarships: number;
  totalApplicants: number;
  totalAwarded: string;
}

export interface ProviderProfileData {
  name: string;
  role: string;
  avatarUrl?: string;
  stats: ProviderStats;
  profileStrength: number;
}
