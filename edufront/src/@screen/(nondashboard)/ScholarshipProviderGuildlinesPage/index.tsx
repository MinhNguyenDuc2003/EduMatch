'use client';

import React from 'react';
import HeroSection from './components/HeroSection';
import ScholarshipProviderGuildelines from './components/ScholarshipProviderGuildelines';

const ScholarshipProviderGuildlinesPage = () => {
  return (
    <div className="flex flex-col w-full h-full gap-6">
      <HeroSection />
      <ScholarshipProviderGuildelines />
    </div>
  );
};

export default ScholarshipProviderGuildlinesPage;
