'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/pattern/cus/sheet';
import { X, Heart, Send, Loader2 } from 'lucide-react';
import { Button } from '@/pattern/cus/button';
import Image from 'next/image';
import GradientProgressBar from './GradientProgressBar';
import { useTranslations } from 'next-intl';

interface RecommendedScholarshipDetailProps {
  scholarship?: Scholarship;
  applicantProfile?: ApplicantProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RecommendedScholarshipDetail({
  scholarship,
  applicantProfile,
  open,
  onOpenChange,
}: RecommendedScholarshipDetailProps) {
  const tProfile = useTranslations('recommendedScholarshipsDetail.profile');
  const tDetail = useTranslations('recommendedScholarshipsDetail.detail');
  const tScholarship = useTranslations('recommendedScholarshipsDetail.scholarship');
  const tScholarshipDetail = useTranslations('scholarshipDetail');

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

          {!scholarship?.llmScore && (
            <>
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            </>
          )}

          {/* 3 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 p-4 border border-gray-200 rounded-lg">
            {/* Left Column - Profile */}
            <div className="lg:col-span-3 pr-4">
              <section className="rounded-lg space-y-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{tProfile('title')}</h3>
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                      <span className="text-lg font-bold text-white">
                        {applicantProfile?.firstName?.charAt(0) || ''}
                        {applicantProfile?.lastName?.charAt(0) || ''}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-sm lg:text-base font-bold text-primary-brand">
                      {applicantProfile?.firstName} {applicantProfile?.lastName}
                    </h2>
                    <p className="text-sm text-gray-600">{applicantProfile?.contactName}</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-4">{tDetail('title')}</h3>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">{tDetail('criteria')}</h4>
                  {/* {candidateData.mainSkills.map((skill, index) => (
                    <GradientProgressBar
                      key={index}
                      label={skill.name}
                      percentage={skill.percentage}
                    />
                  ))} */}
                  <GradientProgressBar
                    label={tDetail('careerScore')}
                    percentage={scholarship?.llmScore?.career_score ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('achievementScore')}
                    percentage={scholarship?.llmScore?.achievement_score ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('extracurricularScore')}
                    percentage={scholarship?.llmScore?.extracurricular_score ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('experienceScore')}
                    percentage={scholarship?.llmScore?.experience_score ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('educationScore')}
                    percentage={scholarship?.llmScore?.education_score ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('intentionScore')}
                    percentage={scholarship?.llmScore?.intentions_score ?? 0}
                  />
                  {/* <GradientProgressBar
                    label={tDetail('overallScore')}
                    percentage={scholarship?.llmScore?.overall_soft_score ?? 0}
                  /> */}
                  <GradientProgressBar
                    label={tDetail('majorScore')}
                    percentage={scholarship?.cosineScore?.major ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('researchScore')}
                    percentage={scholarship?.cosineScore?.research ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('skillScore')}
                    percentage={scholarship?.cosineScore?.skills ?? 0}
                  />
                </div>
              </section>

              {/* Score */}
              <section>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">{tDetail('score')}</h4>
                <GradientProgressBar
                  label=""
                  percentage={scholarship?.score ?? 0}
                  customColor="#ef4444"
                />
              </section>

              {/* About */}
              <section>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">{tDetail('about')}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{tDetail('aboutContent')}</p>
              </section>
            </div>

            {/* Right Column - Qualifier */}
            <div className="lg:col-span-3 pl-4 ">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                  {tScholarship('title')}
                </h3>

                {/* Provider Info */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg border border-gray-200 p-1 flex items-center justify-center bg-white flex-shrink-0">
                    {scholarship?.providerProfileVo?.logoUrl ? (
                      <Image
                        src={scholarship.providerProfileVo.logoUrl}
                        alt={scholarship.providerProfileVo.organizationName || ''}
                        width={48}
                        height={48}
                        className="rounded-md object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-md font-bold text-gray-500">
                        {scholarship?.providerProfileVo?.organizationName?.charAt(0) || 'S'}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {scholarship?.providerProfileVo?.organizationName}
                    </h4>
                    {scholarship?.providerProfileVo?.addressSummary && (
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">
                        {scholarship.providerProfileVo.addressSummary}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Key Facts */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">
                        {tScholarshipDetail('metadata.deadline')}
                      </span>
                      <span className="font-medium text-gray-900">
                        {scholarship?.endDate
                          ? new Date(scholarship.endDate).toLocaleDateString()
                          : tScholarshipDetail('noDeadline')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">
                        {tScholarshipDetail('content.availableSlots')}
                      </span>
                      <span className="font-medium text-gray-900">
                        {scholarship?.availableSlots || tScholarshipDetail('content.notAvailable')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">
                        {tScholarshipDetail('content.scholarshipType')}
                      </span>
                      <span className="font-medium text-gray-900">
                        {scholarship?.scholarshipType}
                      </span>
                    </div>
                    {scholarship?.fundingAmount && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">
                          {tScholarshipDetail('metadata.amount')}
                        </span>
                        <span className="font-medium text-gray-900">
                          {scholarship.fundingAmount}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Requirements */}
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-3">
                      {tScholarshipDetail('content.criteria')}
                    </h4>
                    <div className="space-y-3">
                      {scholarship?.gpaRequirement && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">
                            {tScholarshipDetail('content.gpaRequirement')}
                          </span>
                          <span className="font-medium text-gray-900">
                            {scholarship.gpaRequirement.toFixed(1)} / 4.0
                          </span>
                        </div>
                      )}
                      {(scholarship?.requiredIeltsScore || 0) > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">
                            {tScholarshipDetail('content.requiredIeltsScore')}
                          </span>
                          <span className="font-medium text-gray-900">
                            {scholarship?.requiredIeltsScore}
                          </span>
                        </div>
                      )}
                      {(scholarship?.requiredToeflScore || 0) > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">
                            {tScholarshipDetail('content.requiredToeflScore')}
                          </span>
                          <span className="font-medium text-gray-900">
                            {scholarship?.requiredToeflScore}
                          </span>
                        </div>
                      )}
                      {scholarship?.requiredMajor && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">
                            {tScholarshipDetail('content.requiredMajor')}
                          </span>
                          <span className="font-medium text-gray-900 text-right max-w-[60%] truncate">
                            {scholarship.requiredMajor}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
