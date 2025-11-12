'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: response,
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

      <ScholarshipsSection
        scholarships={scholarships}
        isLoading={isLoading}
        isError={isError}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onViewDetails={(item) => router.push(`/scholarships/${item.slug}`)}
      />
      <FeaturesSection />

      <HowItWorksSection />

      <CTASection />
    </>
  );
}
