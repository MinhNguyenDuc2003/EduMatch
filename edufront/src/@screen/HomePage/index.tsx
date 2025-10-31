'use client';

import { useRouter } from 'next/navigation';
import Footer from '@/pattern/core/Footer';
import Header from '@/pattern/core/Header';

import {
  BannerSection,
  FeaturesSection,
  HowItWorksSection,
  ScholarshipsSection,
  CTASection,
} from './components';
import { mockScholarshipOpportunities } from './mockData';

export default function HomePage() {
  const router = useRouter();
  const scholarships = mockScholarshipOpportunities;
  
  return (
    <>
      <BannerSection />

      <ScholarshipsSection
        scholarships={scholarships || []}
        onViewDetails={(item) => router.push(`/scholarships/${item.id}`)}
      />
      <FeaturesSection />

      <HowItWorksSection />

      <CTASection />
    </>
  );
}
