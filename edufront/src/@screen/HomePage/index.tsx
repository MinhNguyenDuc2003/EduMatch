'use client';

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
  const scholarships = mockScholarshipOpportunities;
  return (
    <>
      <Header />

      <BannerSection />

      <ScholarshipsSection
        scholarships={scholarships || []}
        onViewDetails={(item) => console.log('View Details:', item.Title)}
      />
      <FeaturesSection />

      <HowItWorksSection />

      <CTASection />

      <Footer />
    </>
  );
}
