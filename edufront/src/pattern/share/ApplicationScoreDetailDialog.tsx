import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/pattern/cus/sheet';
import { X, Loader2 } from 'lucide-react';
import GradientProgressBar from '@/pattern/share/GradientProgressBar';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface ApplicationScoreDetailDialogProps {
  applicationScholarship?: ApplicationScholarship;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ApplicationScoreDetailDialog({
  applicationScholarship,
  open,
  onOpenChange,
}: ApplicationScoreDetailDialogProps) {
  const tDetail = useTranslations('recommendedScholarshipsDetail.detail');
  const tProfile = useTranslations('recommendedScholarshipsDetail.profile');
  const tScholarship = useTranslations('recommendedScholarshipsDetail.scholarship');
  const tScholarshipDetail = useTranslations('scholarshipDetail');

  if (!applicationScholarship) {
    return null;
  }
  const scholarship = applicationScholarship.scholarshipVo;
  const application = applicationScholarship.applicationVo;

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
                {tDetail('score')} - {application.fullName}
              </SheetTitle>
              <SheetClose className="rounded-full bg-white p-2 shadow-lg ring-1 ring-gray-200 transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0">
                <X className="h-4 w-4 text-gray-700" />
              </SheetClose>
            </div>
          </SheetHeader>

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
                    label={tDetail('motivationScore')}
                    percentage={applicationScholarship.llmScore?.motivation_score ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('statementScore')}
                    percentage={applicationScholarship.llmScore?.statement_score ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('careerScore')}
                    percentage={applicationScholarship.llmScore?.career_score ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('achievementScore')}
                    percentage={applicationScholarship.llmScore?.achievement_score ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('extracurricularScore')}
                    percentage={applicationScholarship.llmScore?.extracurricular_score ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('majorScore')}
                    percentage={applicationScholarship.cosineScore?.major ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('researchScore')}
                    percentage={applicationScholarship.cosineScore?.research ?? 0}
                  />
                  <GradientProgressBar
                    label={tDetail('skillScore')}
                    percentage={applicationScholarship.cosineScore?.skills ?? 0}
                  />
                </div>
              </section>

              <section>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">{tDetail('score')}</h4>
                <GradientProgressBar
                  label=""
                  percentage={applicationScholarship.score ?? 0}
                  customColor="#ef4444"
                />
              </section>
            </div>

            {/* Right Column - Application Profile */}
            <div className="lg:col-span-3 pl-4">
              <section className="rounded-lg space-y-4">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gradient-to-br from-[#38a696] to-[#52c0b0]">
                      <span className="text-lg font-bold text-white">
                        {application.fullName?.charAt(0) || ''}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-sm lg:text-base font-bold text-primary-brand">
                      {application.fullName}
                    </h2>
                    <p className="text-sm text-gray-600">{application.email}</p>
                  </div>
                </div>

                {/* Application Info */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Full Name</p>
                    <p className="text-sm font-semibold text-gray-900">{application.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm font-semibold text-gray-900">{application.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Major</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {application.major || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">GPA</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {application.gpa || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Applied Date</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {applicationScholarship.createdDate
                        ? new Date(applicationScholarship.createdDate).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <p className="text-sm font-semibold text-gray-900 capitalize">
                      {applicationScholarship.status || 'Pending'}
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
