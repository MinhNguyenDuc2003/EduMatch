'use client';

import React from 'react';
import { Skeleton } from '@/lib/cus/skeleton';
import { ProfileHeaderSkeleton } from './ProfileHeader';

// Skeleton for a single form field
const FormFieldSkeleton = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
};

// Skeleton for textarea form field
const TextareaFieldSkeleton = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-24 w-full rounded-md" />
    </div>
  );
};

// Skeleton for two-column form fields
const TwoColumnFieldSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormFieldSkeleton />
      <FormFieldSkeleton />
    </div>
  );
};

// Skeleton for Contact Person card
const ContactPersonSkeleton = () => {
  return (
    <div className="border-2 border-gray-200 rounded-lg p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>

      {/* Contact Name & Role Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormFieldSkeleton />
        <FormFieldSkeleton />
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormFieldSkeleton />
        <FormFieldSkeleton />
      </div>

      {/* LinkedIn URL */}
      <FormFieldSkeleton />
    </div>
  );
};

// Main ProviderProfileSkeleton component
const ProviderProfileSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 bg-white">
      {/* Header Section */}
      <ProfileHeaderSkeleton />

      {/* Form Section */}
      <div className="py-8">
        <div className="space-y-8 grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr">
          {/* Organization Information */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />

            {/* Organization Name */}
            <FormFieldSkeleton />

            {/* Organization Type & Country */}
            <TwoColumnFieldSkeleton />

            {/* Year Established */}
            <FormFieldSkeleton />

            {/* Address Summary */}
            <FormFieldSkeleton />

            {/* Description */}
            <TextareaFieldSkeleton />

            {/* Accreditation */}
            <FormFieldSkeleton />

            {/* Specialization */}
            <FormFieldSkeleton />

            {/* Contact Information Header */}
            <Skeleton className="h-8 w-64" />

            {/* Email & Phone */}
            <TwoColumnFieldSkeleton />

            {/* Website */}
            <FormFieldSkeleton />
          </div>

          {/* Contact Persons */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-10 w-36 rounded-md" />
            </div>

            {/* Contact Person Cards */}
            <ContactPersonSkeleton />
            <ContactPersonSkeleton />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default ProviderProfileSkeleton;
