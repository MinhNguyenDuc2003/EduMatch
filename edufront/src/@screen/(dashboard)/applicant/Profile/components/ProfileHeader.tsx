'use client';

import React from 'react';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback } from '@/pattern/cus/avatar';
import { Button } from '@/pattern/cus/button';
import { useAuth } from '@/hooks/useAuth';

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
  const t = useTranslations('applicantProfile.profileHeader');
  const { isAuthenticated, subscriptions } = useAuth();
  const router = useRouter();

  return (
    <div className="bg-[#FAFAF6] rounded-lg border border-[#828282] p-6 h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Section: Avatar and Name */}
      <div className="flex flex-col lg:gap-4 items-center justify-center">
        <Avatar className="w-12 h-12">
          <AvatarFallback className="bg-primary-brand text-primary-foreground font-semibold">
            {name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg lg:text-xl font-bold text-primary-brand">{name}</h2>
          <p className="text-lg text-gray-600">{role}</p>
        </div>
      </div>

      {/* Right Section: Stats */}
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <Button
          variant="custom"
          onClick={() => router.push('/applicant/profile/update')}
          value={t('editProfile')}
          className="bg-primary-brand w-full text-white rounded-md px-4 py-2"
        />

        <Button
          variant="custom"
          onClick={() => router.push('/subscriptions?type=APPLICANT')}
          value={
            subscriptions.some((subscription) => subscription.userType === 'APPLICANT')
              ? t('expandPackage')
              : t('upgradePackage')
          }
          className="bg-primary-brand w-full text-white rounded-md py-4"
        />

        <Button
          variant="custom"
          onClick={() => router.push('/applicant/paymentHistory')}
          value={t('paymentHistory')}
          className="bg-primary-brand w-full text-white rounded-md py-4"
        />


      </div>
    </div>
  );
}
