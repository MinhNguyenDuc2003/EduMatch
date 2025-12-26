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
  const tScholarshipDetail = useTranslations('scholarshipDetail');

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="w-full p-0 sm:max-w-7xl h-fit max-h-[95vh] overflow-y-auto [&>button]:hidden rounded-xl !left-1/2 !-translate-x-1/2 !top-1/2 !-translate-y-1/2 scrollbar-hide"
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
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">
                        {tScholarshipDetail('content.studyLevel')}
                      </span>
                      <span className="font-medium text-gray-900">{scholarship?.studyLevel}</span>
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
                      {scholarship?.description && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            {tScholarshipDetail('content.description')}
                          </p>
                          <p className="text-sm font-semibold text-gray-900 line-clamp-3">
                            {scholarship?.description || 'N/A'}
                          </p>
                        </div>
                      )}
                      {scholarship?.benefits && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            {tScholarshipDetail('content.benefits')}
                          </p>
                          <p className="text-sm font-semibold text-gray-900 line-clamp-3">
                            {scholarship?.benefits}
                          </p>
                        </div>
                      )}
                      {scholarship?.fields && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            {tScholarshipDetail('content.fields')}
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {scholarship?.fields}
                          </p>
                        </div>
                      )}
                      {scholarship?.requirements && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            {tScholarshipDetail('content.requirements')}
                          </p>
                          <p className="text-sm font-semibold text-gray-900 line-clamp-3">
                            {scholarship?.requirements}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          {tScholarshipDetail('content.requiredMajor')}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {scholarship?.requiredMajor}
                        </p>
                      </div>
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
                  {applicant?.careerGoals && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{tProfile('careerGoals')}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {applicant?.careerGoals || 'N/A'}
                      </p>
                    </div>
                  )}
                  {applicant?.extracurricularActivities && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        {tProfile('extracurricularActivities')}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {applicant?.extracurricularActivities}
                      </p>
                    </div>
                  )}
                  {applicant?.researchInterest && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{tProfile('researchInterest')}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {applicant?.researchInterest}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{tProfile('educationLevel')}</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicant?.educationLevel || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{tProfile('gpa')}</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicant?.overallGpa || 'N/A'}
                    </p>
                  </div>
                  {applicant?.educationHistories && applicant?.educationHistories?.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{tProfile('major')}</p>
                      <div className="flex flex-col gap-1">
                        {applicant?.educationHistories.map((educationHistory) => (
                          <p
                            className="text-sm font-semibold text-gray-900 line-clamp-1"
                            key={educationHistory.id}
                          >
                            {educationHistory.majorName}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                  {applicant?.skills && applicant?.skills?.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{tProfile('skills')}</p>
                      <div className="flex flex-col gap-1">
                        {applicant?.skills.map((skill) => (
                          <p
                            className="text-sm font-semibold text-gray-900 line-clamp-1"
                            key={skill.id}
                          >
                            {skill.skillName}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
