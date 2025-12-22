import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/pattern/cus/sheet';
import { X, Loader2 } from 'lucide-react';
import GradientProgressBar from './GradientProgressBar';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface ApplicantScoreDetailDialogProps {
  applicant?: ApplicantProfile;
  scholarship?: Scholarship;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ApplicantScoreDetailDialog({
  applicant,
  scholarship,
  open,
  onOpenChange,
}: ApplicantScoreDetailDialogProps) {
  const tDetail = useTranslations('recommendedScholarshipsDetail.detail');
  const tProfile = useTranslations('recommendedScholarshipsDetail.profile');
  const tScholarship = useTranslations('recommendedScholarshipsDetail.scholarship');
  const tScholarshipDetail = useTranslations('scholarshipDetail');

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="w-full p-0 sm:max-w-7xl min-h-fit max-h-[95vh] overflow-y-auto [&>button]:hidden rounded-xl !left-1/2 !-translate-x-1/2 !top-1/2 !-translate-y-1/2 scrollbar-hide"
      >
        <div className="p-6">
          <SheetHeader className="!p-0 mb-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-bold text-gray-900">
                {tDetail('score')} - {applicant?.firstName} {applicant?.lastName}
              </SheetTitle>
              <SheetClose className="rounded-full bg-white p-2 shadow-lg ring-1 ring-gray-200 transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0">
                <X className="h-4 w-4 text-gray-700" />
              </SheetClose>
            </div>
          </SheetHeader>

          {!applicant?.llmScore && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 p-4 border border-gray-200 rounded-lg">
            {/* Left Column - Scholarship Info */}
            <div className="lg:col-span-3 pr-4 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                  {scholarship?.title}
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

            {/* Center Column - Scores */}
            <div className="lg:col-span-6 space-y-6 border-l border-r border-gray-200 px-4">
              <section>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">{tDetail('criteria')}</h4>
                <div className="space-y-3">
                  <GradientProgressBar
                    label={tDetail('careerScore')}
                    percentage={applicant?.llmScore?.career_score ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('achievementScore')}
                    percentage={applicant?.llmScore?.achievement_score ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('extracurricularScore')}
                    percentage={applicant?.llmScore?.extracurricular_score ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('experienceScore')}
                    percentage={applicant?.llmScore?.experience_score ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('educationScore')}
                    percentage={applicant?.llmScore?.education_score ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('intentionScore')}
                    percentage={applicant?.llmScore?.intentions_score ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('majorScore')}
                    percentage={applicant?.cosineScore?.major ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('researchScore')}
                    percentage={applicant?.cosineScore?.research ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('skillScore')}
                    percentage={applicant?.cosineScore?.skills ?? 0}
                  />
                </div>
              </section>

              <section>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">{tDetail('score')}</h4>
                <GradientProgressBar
                  label=""
                  percentage={applicant?.score ?? 0}
                  customColor="#ef4444"
                />
              </section>
            </div>

            {/* Right Column - Applicant Profile */}
            <div className="lg:col-span-3 pl-4">
              <section className="rounded-lg space-y-4">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                      <span className="text-lg font-bold text-white">
                        {applicant?.firstName?.charAt(0) || ''}
                        {applicant?.lastName?.charAt(0) || ''}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-sm lg:text-base font-bold text-primary-brand">
                      {applicant?.firstName} {applicant?.lastName}
                    </h2>
                    <p className="text-sm text-gray-600">{applicant?.contactName}</p>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Full Name</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicant?.firstName} {applicant?.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicant?.phoneNumber || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Education Level</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicant?.educationLevel || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Overall GPA</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicant?.overallGpa || 'N/A'}
                    </p>
                  </div>
                  {applicant?.satScore && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">SAT Score</p>
                      <p className="text-sm font-semibold text-gray-900">{applicant.satScore}</p>
                    </div>
                  )}
                  {applicant?.actScore && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ACT Score</p>
                      <p className="text-sm font-semibold text-gray-900">{applicant.actScore}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Citizenship</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicant?.citizenshipStatus || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Preferred Country</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicant?.preferredCountry || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Preferred Major</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicant?.preferredMajor || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Scholarship Type</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicant?.preferredScholarshipType || 'N/A'}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
