'use client';

import React from 'react';
import { Skeleton } from '@/lib/cus/skeleton';

// Skeleton for ProfileHeader
const ProfileHeaderSkeleton = () => {
  return (
    <div className="bg-[#FAFAF6] rounded-lg border border-[#828282] p-6 h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Section: Avatar and Name */}
      <div className="flex flex-col lg:gap-4 items-center justify-center">
        <Skeleton className="w-48 h-24 rounded-md" />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>

      {/* Right Section: Stats */}
      <div className="flex flex-col gap-2 w-full justify-center items-center">
        <Skeleton className="h-12 w-full rounded-md" />
        <Skeleton className="h-12 w-full rounded-md" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  );
};

// Skeleton for ProfileStrength
const ProfileStrengthSkeleton = () => {
  return (
    <div className="bg-[#FAFAF6] rounded-lg border border-[#828282] p-6">
      <Skeleton className="h-5 w-32 mb-4" />

      <div className="flex flex-col items-center">
        {/* Circular Progress */}
        <Skeleton className="w-32 h-32 rounded-full mb-4" />

        {/* Description */}
        <div className="text-center space-y-2">
          <Skeleton className="h-4 w-48 mx-auto" />
          <Skeleton className="h-3 w-64 mx-auto" />
        </div>
      </div>
    </div>
  );
};

// Skeleton for InfoCard
const InfoCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={`bg-[#FAFAF6] rounded-lg border border-[#828282] p-6 relative ${className}`}>
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>

      {/* Fields */}
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Skeleton for ArrayInfoCard
const ArrayInfoCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={`bg-[#FAFAF6] rounded-lg border border-[#828282] p-6 relative ${className}`}>
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="pb-3 border-b border-gray-200 last:border-0 last:pb-0">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Skeleton for Certificates section
const CertificatesSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Header with Add button */}
      <div className="flex gap-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>

      {/* Certificate cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-[#FAFAF6] rounded-lg border border-[#828282] p-4">
            <Skeleton className="h-32 w-full rounded-md mb-3" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Skeleton for Intentions section
const IntentionsSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Header with Add button */}
      <div className="flex gap-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>

      {/* Intention cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="bg-[#FAFAF6] rounded-lg border border-[#828282] p-4">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2 mb-3" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main ProfileSkeleton component
const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-40">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Header and Strength */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
          <div className="lg:col-span-2">
            <ProfileHeaderSkeleton />
          </div>
          <ProfileStrengthSkeleton />
        </div>

        {/* Grid Layout for Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-4 gap-6 auto-rows-fr">
          {/* Student Information */}
          <InfoCardSkeleton className="lg:row-span-4" />

          {/* Interests & Activities */}
          <InfoCardSkeleton className="lg:row-span-2" />

          {/* Phone Numbers */}
          <ArrayInfoCardSkeleton className="lg:col-start-2 lg:row-start-3" />

          {/* Account Settings */}
          <InfoCardSkeleton className="lg:col-start-2 lg:row-start-4" />

          {/* Education History */}
          <ArrayInfoCardSkeleton className="lg:col-start-3 lg:row-start-1 lg:row-span-2" />

          {/* Skills */}
          <ArrayInfoCardSkeleton className="lg:col-start-3 lg:row-start-3 lg:row-span-2" />
        </div>

        {/* Certificates Section */}
        <CertificatesSkeleton />

        {/* Intentions Section */}
        <IntentionsSkeleton />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
