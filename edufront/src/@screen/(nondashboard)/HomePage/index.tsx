'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  BannerSection,
  FeaturesSection,
  HowItWorksSection,
  ScholarshipsSection,
  TopViewScholarshipSection,
  CTASection,
} from './components';
import { usePageScholarshipsQuery } from '@/state/apiScholarship';

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: response,
    isLoading,
    isError,
  } = usePageScholarshipsQuery({
    criteria: {
      country: '',
      studyLevel: '',
      scholarshipType: '',
    },
    sortBy: 'id',
    sortDirection: 'DESC',
    page: currentPage,
    size: 9,
  });

  const scholarships = response?.content ?? [];
  const totalPages = response?.totalPages ?? 0;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <BannerSection />

      <TopViewScholarshipSection />
      <ScholarshipsSection
        scholarships={scholarships}
        isLoading={isLoading}
        isError={isError}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <FeaturesSection />

      <HowItWorksSection />

      <CTASection />
    </>
  );
}
