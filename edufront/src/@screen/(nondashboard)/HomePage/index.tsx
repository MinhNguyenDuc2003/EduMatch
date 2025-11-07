'use client';

import { useRouter } from 'next/navigation';
import Footer from '@/pattern/core/Footer';
import Header from '@/pattern/core/Navbar';

import {
  BannerSection,
  FeaturesSection,
  HowItWorksSection,
  ScholarshipsSection,
  CTASection,
} from './components';
import { useSearchScholarshipsQuery } from '@/state/apiScholarship';

export default function HomePage() {
  const router = useRouter();

  const {
    data: response,
    isLoading,
    isError,
  } = useSearchScholarshipsQuery({
    criteria: {
      country: '',
      university: '',
      studyLevel: '',
      scholarshipType: '',
    },
    sortBy: 'id',
    sortDirection: 'DESC',
    page: 0,
    size: 50,
  });

  const scholarships = response?.content || [];

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
