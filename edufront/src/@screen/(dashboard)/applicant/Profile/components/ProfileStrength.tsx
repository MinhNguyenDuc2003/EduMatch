'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface ProfileStrengthProps {
  percentage: number;
}

export default function ProfileStrength({ percentage }: ProfileStrengthProps) {
  const t = useTranslations('applicantProfile.profileStrength');
  const circumference = 2 * Math.PI * 45; // radius = 45
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-[#FAFAF6] rounded-lg border border-[#828282] p-6">
      <h3 className="text-sm font-semibold text-gray-900">{t('title')}</h3>

      <div className="flex flex-col items-center">
        {/* Circular Progress */}
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90 w-32 h-32">
            {/* Background circle */}
            <circle cx="64" cy="64" r="45" stroke="#E5E7EB" strokeWidth="10" fill="none" />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="#0B5C8C"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-[#0B5C8C]">{percentage}%</span>
          </div>
        </div>

        {/* Description */}
        <div className="text-center">
          <p className="text-sm text-gray-700 font-medium">{t('description')}</p>
          <p className="text-xs text-gray-600 mt-1">{t('subDescription')}</p>
        </div>
      </div>
    </div>
  );
}
