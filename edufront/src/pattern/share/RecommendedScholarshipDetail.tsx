'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/pattern/cus/sheet';
import { X, Heart, Send } from 'lucide-react';
import { Button } from '@/pattern/cus/button';
import Image from 'next/image';
import GradientProgressBar from './GradientProgressBar';

interface RecommendedScholarshipDetailProps {
  applicantProfile?: ApplicantProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RecommendedScholarshipDetail({
  applicantProfile,
  open,
  onOpenChange,
}: RecommendedScholarshipDetailProps) {
  // Hardcoded data based on the image
  const candidateData = {
    name: 'Floyd Miles',
    avatar: '/placeholder-avatar.jpg',
    role: 'Designer',
    seniority: 'Middle',
    experience: '5+ years',
    location: 'Tallinn, Estonia',
    timezone: 'EET (GMT+2)',
    about:
      'Obsessed with technology. Passionate for learning and getting new experience. Lived in 4 countries, tried different fields and hobbies. In love with web development',
    mainSkills: [
      { name: 'Design', percentage: 90 },
      { name: 'Figma', percentage: 82 },
      { name: 'UX', percentage: 81 },
      { name: 'UI Design', percentage: 74 },
      { name: 'UX Research', percentage: 71 },
      { name: 'Dashboards', percentage: 68 },
    ],
    demandScore: 92,
    qualifiers: [
      {
        company: 'Microsoft Inc.',
        position: 'UX Designer',
        match: 93,
      },
      {
        company: 'Microsoft Inc.',
        position: 'UX Designer',
        match: 93,
      },
      {
        company: 'Microsoft Inc.',
        position: 'UX Designer',
        match: 93,
      },
    ],
    aiComputations: {
      annualCost: '$180,000',
      noticePeriod: 'One week',
      avgEngagementLength: '6.2 months',
      engagementTypePreference: 'Long-term',
    },
    cultureFit: {
      jobHistory: 'Very High (95%)',
      community: 'High (85%)',
    },
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="w-full p-0 sm:max-w-7xl min-h-[95vh] overflow-y-auto [&>button]:hidden rounded-xl !left-1/2 !-translate-x-1/2 !top-1/2 !-translate-y-1/2 scrollbar-hide"
      >
        <div className="p-6">
          {/* Header */}
          <SheetHeader className="!p-0 mb-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-bold text-gray-900">Chưa có Tiêu đề</SheetTitle>
              <div className="flex items-center gap-2">
                {/* <Button className="bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white">Button</Button> */}
                <SheetClose className="rounded-full bg-white p-2 shadow-lg ring-1 ring-gray-200 transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0">
                  <X className="h-4 w-4 text-gray-700" />
                </SheetClose>
              </div>
            </div>
          </SheetHeader>

          {/* 3 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 p-4 border border-gray-200 rounded-lg">
            {/* Left Column - Profile */}
            <div className="lg:col-span-3 space-y-4 pr-4">
              <section className="rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Profile</h3>

                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                    <span className="text-2xl font-bold text-white">
                      {applicantProfile?.firstName?.charAt(0) || ''}
                      {applicantProfile?.lastName?.charAt(0) || ''}
                    </span>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Full Name</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicantProfile?.firstName} {applicantProfile?.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicantProfile?.phoneNumber || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Education Level</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicantProfile?.educationLevel || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Overall GPA</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicantProfile?.overallGpa || 'N/A'}
                    </p>
                  </div>
                  {applicantProfile?.satScore && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">SAT Score</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {applicantProfile.satScore}
                      </p>
                    </div>
                  )}
                  {applicantProfile?.actScore && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ACT Score</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {applicantProfile.actScore}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Citizenship</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicantProfile?.citizenshipStatus || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Preferred Country</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicantProfile?.preferredCountry || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Preferred Major</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicantProfile?.preferredMajor || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Scholarship Type</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicantProfile?.preferredScholarshipType || 'N/A'}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Center Column - Details */}
            <div className="lg:col-span-6 space-y-6 border-l border-r border-gray-200 px-4">
              {/* Main Skills */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Details</h3>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">Main skills</h4>
                  {candidateData.mainSkills.map((skill, index) => (
                    <GradientProgressBar
                      key={index}
                      label={skill.name}
                      percentage={skill.percentage}
                    />
                  ))}
                </div>
              </section>

              {/* Demand Score */}
              <section>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Demand score</h4>
                <GradientProgressBar
                  label=""
                  percentage={candidateData.demandScore}
                  customColor="#ef4444"
                />
              </section>

              {/* About */}
              <section>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">About</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{candidateData.about}</p>
              </section>
            </div>

            {/* Right Column - Qualifier */}
            <div className="lg:col-span-3 pl-4 ">
              <div className=" space-y-4">
                <h3 className="text-lg font-bold text-pink-600 flex items-center gap-2">
                  Qualifier 🔥
                </h3>

                {/* Match to your jobs */}
                <section>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Match to your jobs</h4>
                  <div className="space-y-3">
                    {candidateData.qualifiers.map((qualifier, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">
                            {qualifier.company.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {qualifier.position}
                          </p>
                          <p className="text-xs text-gray-600">{qualifier.company}</p>
                        </div>
                        <GradientProgressBar
                          label=""
                          percentage={qualifier.match}
                          orientation="vertical"
                        />
                        <span className="text-sm font-bold text-gray-900 flex-shrink-0">
                          {qualifier.match}%
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* AI Computations */}
                <section>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">AI Computations</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Annual cost</p>
                      <p className="text-sm font-bold text-gray-900">
                        {candidateData.aiComputations.annualCost}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Notice period</p>
                      <p className="text-sm font-bold text-gray-900">
                        {candidateData.aiComputations.noticePeriod}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Avg Engagement length</p>
                      <p className="text-sm font-bold text-gray-900">
                        {candidateData.aiComputations.avgEngagementLength}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Engagement type preference</p>
                      <p className="text-sm font-bold text-gray-900">
                        {candidateData.aiComputations.engagementTypePreference}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Culture Fit */}
                <section>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Culture fit</h4>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Based on job history</p>
                      <p className="text-sm font-bold text-gray-900">
                        {candidateData.cultureFit.jobHistory}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Based on community</p>
                      <p className="text-sm font-bold text-gray-900">
                        {candidateData.cultureFit.community}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
