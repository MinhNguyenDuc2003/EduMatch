export interface ProviderContactDto {
  id: number;
  providerId: number;
  contactName: string;
  roleTitle: string;
  email: string;
  phone: string;
  linkedinUrl: string;
}
export interface IProviders {
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
  providerContactDtos: ProviderContactDto[];
  isFollow: number;
}
