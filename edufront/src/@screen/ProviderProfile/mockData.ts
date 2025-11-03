import { ProviderProfileApiResponse } from './types';

export const mockProviderProfileData: ProviderProfileApiResponse = {
  customer: {
    id: '1',
    username: 'provider123',
    email: 'provider@example.com',
    firstName: 'John',
    lastName: 'Doe',
  },
  applicantProfile: null,
  providerProfile: {
    id: 1,
    userId: '1',
    organizationName: 'Global Education Foundation',
    organizationType: 'Foundation',
    website: 'https://globaleducation.org',
    email: 'info@globaleducation.org',
    phone: '+1-555-0123',
    logoUrl: 'https://iptime.com.vn/wp-content/uploads/2018/12/logo-fpt.jpg',
    bannerUrl:
      'https://tse3.mm.bing.net/th/id/OIP.H7B2zQa6tyItU1JR6pPcngHaEE?rs=1&pid=ImgDetMain&o=7&rm=3',
    addressSummary: '123 Education Street, New York, NY 10001, USA',
    description:
      'We are dedicated to providing educational opportunities to students worldwide through scholarships and grants.',
    yearEstablished: 1995,
    accreditation: 'Accredited by International Education Council',
    specialization: 'STEM Education, International Students',
    verified: true,
    country: 'United States',
    providerContactDtos: [
      {
        id: 1,
        providerId: 1,
        contactName: 'Jane Smith',
        roleTitle: 'Program Director',
        email: 'jane.smith@globaleducation.org',
        phone: '+1-555-0124',
        linkedinUrl: 'https://linkedin.com/in/janesmith',
      },
      {
        id: 2,
        providerId: 1,
        contactName: 'Michael Johnson',
        roleTitle: 'Scholarship Coordinator',
        email: 'michael.johnson@globaleducation.org',
        phone: '+1-555-0125',
        linkedinUrl: 'https://linkedin.com/in/michaeljohnson',
      },
    ],
  },
};
