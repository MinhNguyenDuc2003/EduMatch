'use client';

import { useRouter } from 'next/navigation';

import {
  BannerSection,
  FeaturesSection,
  HowItWorksSection,
  ScholarshipsSection,
  CTASection,
} from './components';
import { usePageScholarshipsQuery } from '@/state/apiScholarship';

export default function HomePage() {
  const router = useRouter();

  const {
    data: scholarships,
    isLoading,
    isError,
  } = usePageScholarshipsQuery({
    criteria: {
      country: '',
      university: '',
      studyLevel: '',
      scholarshipType: '',
    },
    sortBy: 'id',
    sortDirection: 'DESC',
    page: 0,
    size: 9,
  });

  return (
    <>
      <BannerSection />

      <ScholarshipsSection
        scholarships={scholarships || []}
        isLoading={isLoading}
        isError={isError}
        onViewDetails={(item) => router.push(`/scholarships/${item.slug}`)}
      />
      <FeaturesSection />

      <HowItWorksSection />

      <CTASection />
    </>
  );
}
