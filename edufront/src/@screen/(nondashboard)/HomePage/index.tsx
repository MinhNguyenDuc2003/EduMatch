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
  const ITEMS_PER_PAGE = 9;

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
    size: ITEMS_PER_PAGE,
  });

  // Handle both array response and ApiGetScholarshipResponse
  let scholarships: Scholarship[] = [];
  let totalPages = 0;
  let totalElements = 0;

  if (response) {
    if (Array.isArray(response)) {
      scholarships = response;
      totalElements = response.length;
    } else {
      const apiResponse = response as unknown as ApiGetScholarshipResponse;
      scholarships = apiResponse?.content || [];
      totalPages = apiResponse?.totalPages || 0;
      totalElements = apiResponse?.totalElements || 0;
    }
  }

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
        totalElements={totalElements}
        onPageChange={handlePageChange}
        onViewDetails={(item) => router.push(`/scholarships/${item.slug}`)}
      />
      <FeaturesSection />

      <HowItWorksSection />

      <CTASection />
    </>
  );
}
