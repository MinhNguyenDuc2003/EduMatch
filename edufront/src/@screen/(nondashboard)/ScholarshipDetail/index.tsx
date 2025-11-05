'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/lib/cus/button';
import { mockScholarshipOpportunities } from '@/@screen/(nondashboard)/HomePage/mockData';
import { ScholarshipMetadata, ScholarshipContent, ScholarshipSidebar } from './components';
import BreadcrumbHeader from '@/pattern/core/BreadcrumbHeader';

type ScholarshipDetailProps = {
  scholarshipId: number;
};

export default function ScholarshipDetail({ scholarshipId }: ScholarshipDetailProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Find scholarship by ID
  const scholarship = mockScholarshipOpportunities.find((s) => s.id === scholarshipId);

  if (!scholarship) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Scholarship not found</h1>
          <Button
            value="Back to Scholarships"
            onClick={() => router.push('/scholarships')}
            variant="outline"
          />
        </div>
      </div>
    );
  }

  // Format date
  const formattedDate = scholarship.endDate
    ? new Date(scholarship.endDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'No deadline';

  // Parse amount
  const amount = scholarship.fundingAmount
    ? scholarship.fundingAmount.replace(/[^0-9.]/g, '')
    : '0';

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs Header */}
      <BreadcrumbHeader
        items={[{ label: 'Scholarships', href: '/scholarships' }, { label: scholarship.title }]}
      />

      {/* Main Content */}
      <div className="mx-auto px-4 lg:px-40 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900">{scholarship.title}</h1>

            {/* Metadata Row */}
            <ScholarshipMetadata
              formattedDate={formattedDate}
              amount={amount}
              isSaved={isSaved}
              onToggleSave={() => setIsSaved(!isSaved)}
            />

            {/* Content Sections */}
            <ScholarshipContent scholarship={scholarship} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 ">
            <div className="sticky top-24 flex flex-col gap-4">
              <ScholarshipSidebar
                scholarship={scholarship}
                isFollowing={isFollowing}
                onToggleFollow={() => setIsFollowing(!isFollowing)}
              />
              {/* Action Button */}
              <Button
                value="Apply Now"
                variant="ok"
                size="lg"
                full
                className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
