declare global {
  type ProviderContact = {
    id: number;
    providerId: number;
    contactName: string;
    roleTitle: string;
    email: string;
    phone: string;
    linkedinUrl: string;
  };

  type ProviderProfile = {
    id: number;
    userId: string;
    organizationName: string;
    organizationType: string;
    website: string;
    email: string;
    phone: string;
    logoUrl: string;
    bannerUrl: string;
    addressSummary: string;
    description: string;
    yearEstablished: number;
    accreditation: string;
    specialization: string;
    verified: boolean;
    country: string;
    providerContactDtos: ProviderContact[];
  };

  type ProviderProfileApiResponse = {
    customer: Customer;
    applicantProfile: null;
    providerProfile?: ProviderProfile;
  };

  // UI Component Types
  type ProviderStats = {
    activeScholarships: number;
    totalApplicants: number;
    totalAwarded: string;
  };

  type ProviderProfileData = {
    name: string;
    role: string;
    avatarUrl?: string;
    stats: ProviderStats;
    profileStrength: number;
  };
}

export {};
