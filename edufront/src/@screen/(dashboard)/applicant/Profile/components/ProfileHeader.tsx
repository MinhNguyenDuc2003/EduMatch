'use client';

import React from 'react';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProfileHeaderProps {
  name: string;
  role: string;
  avatarUrl?: string;
  stats: {
    matchedScholarships: number;
    matchedResearchOpportunities: number;
    scholarshipAmount: string;
  };
}

export default function ProfileHeader({ name, role, avatarUrl, stats }: ProfileHeaderProps) {
  const t = useTranslations('homepage.applicantProfile.profileHeader');
  
  return (
    <div className="bg-[#FAFAF6] rounded-lg border border-[#828282] p-6 h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Section: Avatar and Name */}
      <div className="flex flex-col lg:gap-4 items-center justify-center">
        <div className="w-48 h-24 bg-gray-300 rounded-md flex items-center justify-center flex-shrink-0"></div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg lg:text-xl font-bold text-primary-brand">{name}</h2>
          <p className="text-lg text-gray-600">{role}</p>
        </div>
      </div>

      {/* Right Section: Stats */}
      <div className="flex flex-col gap-2 w-full justify-center items-center">
        <div className="bg-[#0B5C8C] text-white rounded-md px-4 py-2 min-w-full">
          <div className="flex justify-between items-center gap-4">
            <span className="font-semibold text-lg">{stats.matchedScholarships}</span>
            <span className="text-lg">{t('matchedScholarships')}</span>
          </div>
        </div>
        <div className="bg-[#0B5C8C] text-white rounded-md px-4 py-2 min-w-full">
          <div className="flex justify-between items-center gap-4">
            <span className="font-semibold text-lg">{stats.matchedResearchOpportunities}</span>
            <span className="text-lg">{t('matchedResearchOpportunities')}</span>
          </div>
        </div>
        <div className="bg-[#0B5C8C] text-white rounded-md px-4 py-2 min-w-full">
          <div className="flex justify-between items-center gap-4">
            <span className="font-semibold text-lg">{stats.scholarshipAmount}</span>
            <span className="text-lg">{t('matchedScholarshipsAmount')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
