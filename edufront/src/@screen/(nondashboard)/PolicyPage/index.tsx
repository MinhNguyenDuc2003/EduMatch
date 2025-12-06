'use client';

import { HeroSection, PolicySection } from './components';

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <PolicySection sectionKey="privacyPolicy" />
        <div className="border-t border-gray-200 my-12" />
        <PolicySection sectionKey="termsOfService" />
      </div>
    </div>
  );
}

