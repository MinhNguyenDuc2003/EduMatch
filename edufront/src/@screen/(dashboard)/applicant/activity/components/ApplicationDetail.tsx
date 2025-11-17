'use client';

import { X, Phone, Mail } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/lib/cus/sheet';
import { Avatar, AvatarFallback } from '@/lib/cus/avatar';
import { Badge } from '@/lib/cus/badge';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type ApplicationDetailProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: Application | null;
  appliedScholarship?: ApplicationScholarship | null;
  onViewProvider?: (providerId?: number) => void;
  onViewScholarship?: (slug?: string) => void;
};

const formatDate = (date?: number | string) => {
  if (!date) return 'N/A';
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return 'N/A';
  }
};

const formatDateTime = (date?: number) => {
  if (!date) return 'N/A';
  try {
    const dateObj = new Date(date > 1e12 ? date : date * 1000);
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'N/A';
  }
};

const formatStatus = (status?: string, t?: (key: string) => string) => {
  if (!t) return 'Pending';
  if (!status) return t('status.pending');
  const statusLower = status.toLowerCase();
  if (statusLower === 'approved') return t('status.approved');
  if (statusLower === 'rejected') return t('status.rejected');
  return t('status.pending');
};

const getStatusColor = (status?: string): string => {
  if (!status) return 'bg-blue-100 text-blue-700';
  const statusLower = status.toLowerCase();
  if (statusLower === 'approved') return 'bg-green-100 text-green-700';
  if (statusLower === 'rejected') return 'bg-red-100 text-red-700';
  return 'bg-blue-100 text-blue-700'; // pending (default)
};

const getTimelineDotColor = (status?: string): string => {
  if (!status) return 'bg-blue-500 text-blue-700';
  const statusLower = status.toLowerCase();
  if (statusLower === 'approved') return 'bg-green-500 text-green-700';
  if (statusLower === 'rejected') return 'bg-red-500 text-red-700';
  return 'bg-blue-500 text-blue-700'; // pending (default)
};

export default function ApplicationDetail({
  open,
  onOpenChange,
  onViewProvider,
  onViewScholarship,
  application,
  appliedScholarship,
}: ApplicationDetailProps) {
  const t = useTranslations('homepage.activity.applicationDetail');
  if (!application) return null;

  const {
    status,
    reviewedAt,
    note,
    scholarshipVo: scholarship,
    applicationVo,
  } = appliedScholarship || {};
  const {
    id: providerId,
    organizationName,
    logoUrl,
    email: scholarshipEmail,
    phone: scholarshipPhone,
  } = scholarship?.providerProfileVo || {};
  const {
    fullName,
    gender,
    dateOfBirth,
    address,
    email: applicationEmail,
    phone: applicationPhone,
    nationality,
    applicationName,
    skills,
    achievements,
    extracurricular,
    motivation,
    gpa,
    graduationYear,
    schoolName,
    educationLevel,
    major,
  } = applicationVo || application || {};

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full p-4 sm:max-w-2xl max-h-[95vh] overflow-y-auto [&>button]:hidden rounded-xl !right-4 !top-1/2 !-translate-y-1/2 scrollbar-hide"
      >
        <SheetHeader className="!p-0 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SheetTitle className="text-lg font-bold text-gray-900">
                {applicationName ? applicationName : t('title')}
              </SheetTitle>
              {/* Status */}
              {status && (
                <Badge className={`${getStatusColor(status)} border`}>
                  {formatStatus(status, t)}
                </Badge>
              )}
            </div>
            {/* Close button */}
            <SheetClose className="rounded-full bg-white p-2 shadow-lg ring-1 ring-gray-200 transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0">
              <X className="h-4 w-4 text-gray-700" />
              <span className="sr-only">{t('close')}</span>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Scholarship Section */}
          {scholarship && (
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {t('scholarshipInformation')}
              </h3>
              <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4 space-y-4">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  {logoUrl ? (
                    <div
                      className="relative w-12 h-12 cursor-pointer"
                      onClick={() => onViewProvider?.(providerId)}
                    >
                      <Image
                        src={logoUrl}
                        alt={organizationName || t('organizationLogo')}
                        fill
                        className="rounded-full w-12 h-12 object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="rounded-full w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center cursor-pointer"
                      onClick={() => onViewProvider?.(providerId)}
                    >
                      <span className="text-lg font-bold">
                        {organizationName?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 space-y-1">
                    <h4
                      className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => onViewProvider?.(providerId)}
                    >
                      {organizationName}
                    </h4>
                    <div className="flex text-sm text-gray-500 items-center font-semibold gap-8">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{scholarshipPhone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{scholarshipEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Scholarship Information */}
                <div className="text-sm">
                  <div
                    className="flex flex-col text-sm text-gray-500 items-start font-semibold gap-2 bg-gray-100 rounded-md p-3 hover:bg-gray-200 transition-colors cursor-pointer"
                    onClick={() => scholarship?.slug && onViewScholarship?.(scholarship.slug)}
                  >
                    <div className="flex items-center gap-2">
                      <span>{t('scholarship')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-gray-900">{scholarship.title}</span>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-2">
                        <span>
                          {t('amount')} {scholarship.fundingAmount}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{t('statusLabel')} </span>
                        <Badge className={`${getStatusColor(status)} border`}>
                          {formatStatus(status, t)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Personal Detail Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">{t('personalDetail')}</h3>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4 space-y-4">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-semibold">
                    {fullName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold text-gray-900">{fullName}</h4>
                  <div className="flex text-sm text-gray-500 items-center font-semibold gap-8">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{applicationPhone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{applicationEmail || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Additional Information */}
              <div className="text-sm bg-gray-100 rounded-md p-3">
                <p className="text-sm font-semibold text-gray-600 mb-2">
                  {t('additionalInformation')}
                </p>
                <div className="grid text-sm text-gray-500 items-center font-semibold grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span>
                      {t('gender')} {gender || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>
                      {t('dateOfBirth')} {formatDate(dateOfBirth) || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>
                      {t('address')} {address || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>
                      {t('nationality')} {nationality || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Education Background Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">{t('educationBackground')}</h3>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
              <div className="grid text-sm text-gray-700 items-start font-medium grid-cols-2 gap-2">
                <div className="col-span-2 flex items-center gap-2">
                  <span>
                    {t('school')} {schoolName || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>
                    {t('educationLevel')} {educationLevel || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>
                    {t('major')} {major || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>
                    {t('gpa')} {gpa !== undefined && gpa !== null ? gpa.toFixed(2) : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>
                    {t('graduationYear')} {graduationYear || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Skills & Achievements Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">{t('skillsAchievements')}</h3>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4 space-y-4">
              {/* Skills */}
              {skills && (
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-2">{t('skills')}</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.split(',').map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs px-2 py-1 bg-gray-50 text-gray-700 border-gray-200"
                      >
                        {skill.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                {/* Achievements */}
                {achievements && (
                  <div className="text-sm font-semibold text-gray-500">
                    <p className="mb-2">{t('achievements')}</p>
                    <div className="space-y-1">
                      {achievements.split(',').map((achievement, index) => (
                        <div key={index} className="text-sm text-gray-700 font-semibold">
                          • {achievement.trim()}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Extracurricular Activities */}
                {extracurricular && (
                  <div className="text-sm font-semibold text-gray-500 ">
                    <p className="mb-2">{t('extracurricularActivities')}</p>
                    <div className="space-y-1">
                      {extracurricular.split(',').map((activity, index) => (
                        <div key={index} className="text-sm text-gray-700 font-semibold">
                          • {activity.trim()}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Reason Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">{t('reason')}</h3>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
              <p className="text-sm text-gray-600 bg-gray-50 rounded-md p-3 leading-relaxed">
                {motivation || t('noMotivationProvided')}
              </p>
            </div>
          </section>

          {/* Goals Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">{t('goals')}</h3>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
              <p className="text-sm text-gray-600 bg-gray-50 rounded-md p-3 leading-relaxed">
                {application.personalStatement || t('noPersonalStatementProvided')}
              </p>
            </div>
          </section>

          {/* Application History Section */}
          {reviewedAt && (
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">{t('applicationHistory')}</h3>
              <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
                <div className="space-y-6 pl-2 border-l-2 border-blue-200">
                  {/* review status */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-4 h-4 rounded-full ${getTimelineDotColor(status)} border-2 mt-1 border-white`}
                    ></div>
                    <div className="flex flex-col gap-1">
                      <p className={`text-sm font-medium text-${getStatusColor(status)}`}>
                        {formatStatus(status, t)} {t('application')}
                      </p>
                      <p className="text-sm text-gray-500">{formatDateTime(reviewedAt)}</p>
                      {scholarship && <p className="text-sm text-gray-500">{scholarship.title}</p>}
                      {note && (
                        <div>
                          <span className="text-sm font-medium text-gray-900">{t('note')} </span>
                          <span className="text-sm text-gray-600">{note}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* submission date */}
                </div>
              </div>
            </section>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
