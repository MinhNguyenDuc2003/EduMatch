'use client';

import { X, Phone, Mail, FileText, Download, Image as ImageIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/pattern/cus/sheet';
import { Avatar, AvatarFallback } from '@/pattern/cus/avatar';
import { Badge } from '@/pattern/cus/badge';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

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

const formatDateTime = (date?: number | string) => {
  if (!date) return 'N/A';
  try {
    const dateObj = new Date(typeof date === 'string' ? date : date > 1e12 ? date : date * 1000);
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

const isImageFile = (contentType?: string) => {
  if (!contentType) return false;
  return contentType.startsWith('image/');
};

// Can Change other icon if needed
const getFileIcon = (contentType?: string) => {
  if (!contentType) return FileText;
  if (contentType.includes('pdf')) return FileText;
  if (contentType.includes('word') || contentType.includes('document')) return FileText;
  if (contentType.includes('sheet') || contentType.includes('excel')) return FileText;
  return FileText;
};

const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export default function ApplicationDetail({
  open,
  onOpenChange,
  onViewProvider,
  onViewScholarship,
  application,
  appliedScholarship,
}: ApplicationDetailProps) {
  const t = useTranslations('activity.applicationDetail');
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!application) return null;

  const {
    status,
    reviewedAt,
    note,
    scholarshipVo: scholarship,
    applicationVo,
    createdDate: appliedAt,
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
    createdDate: applicationCreatedDate,
    applicationMedias,
    age,
    citizenship,
    classRank,
    classSize,
    classRankPercentile,
    satScore,
    actScore,
    greScore,
    gmatScore,
    toeflScore,
    ieltsScore,
    languages,
    careerGoal,
    researchInterest,
    academicAwards,
    publicationCount,
    workExperienceYears,
    isAthlete,
    athleticAchievements,
  } = applicationVo || application || {};

  const imageFiles = applicationMedias?.filter((media) => isImageFile(media.contentType)) || [];
  const documentFiles = applicationMedias?.filter((media) => !isImageFile(media.contentType)) || [];

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

              <Badge className={`${getStatusColor(status)} border`}>
                {formatStatus(status, t)}
              </Badge>
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
                  {age !== undefined && age !== null && (
                    <div className="flex items-center gap-2">
                      <span>
                        {t('age')} {age}
                      </span>
                    </div>
                  )}
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
                  {citizenship && (
                    <div className="flex items-center gap-2">
                      <span>
                        {t('citizenship')} {citizenship}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Education Background Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">{t('educationBackground')}</h3>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4 space-y-4">
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
                {(classRank !== undefined && classRank !== null) ||
                (classSize !== undefined && classSize !== null) ||
                (classRankPercentile !== undefined && classRankPercentile !== null) ? (
                  <>
                    {classRank !== undefined && classRank !== null && (
                      <div className="flex items-center gap-2">
                        <span>
                          {t('classRank')} {classRank}
                        </span>
                      </div>
                    )}
                    {classSize !== undefined && classSize !== null && (
                      <div className="flex items-center gap-2">
                        <span>
                          {t('classSize')} {classSize}
                        </span>
                      </div>
                    )}
                    {classRankPercentile !== undefined && classRankPercentile !== null && (
                      <div className="flex items-center gap-2">
                        <span>
                          {t('classRankPercentile')} {classRankPercentile}%
                        </span>
                      </div>
                    )}
                  </>
                ) : null}
              </div>

              {/* Test Scores */}
              {(satScore !== undefined && satScore !== null) ||
              (actScore !== undefined && actScore !== null) ||
              (greScore !== undefined && greScore !== null) ||
              (gmatScore !== undefined && gmatScore !== null) ||
              (toeflScore !== undefined && toeflScore !== null) ||
              (ieltsScore !== undefined && ieltsScore !== null) ? (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">{t('testScores')}</h4>
                  <div className="grid text-sm text-gray-700 items-start font-medium grid-cols-2 gap-2">
                    {satScore !== undefined && satScore !== null && (
                      <div className="flex items-center gap-2">
                        <span>
                          {t('satScore')} {satScore}
                        </span>
                      </div>
                    )}
                    {actScore !== undefined && actScore !== null && (
                      <div className="flex items-center gap-2">
                        <span>
                          {t('actScore')} {actScore}
                        </span>
                      </div>
                    )}
                    {greScore !== undefined && greScore !== null && (
                      <div className="flex items-center gap-2">
                        <span>
                          {t('greScore')} {greScore}
                        </span>
                      </div>
                    )}
                    {gmatScore !== undefined && gmatScore !== null && (
                      <div className="flex items-center gap-2">
                        <span>
                          {t('gmatScore')} {gmatScore}
                        </span>
                      </div>
                    )}
                    {toeflScore !== undefined && toeflScore !== null && (
                      <div className="flex items-center gap-2">
                        <span>
                          {t('toeflScore')} {toeflScore}
                        </span>
                      </div>
                    )}
                    {ieltsScore !== undefined && ieltsScore !== null && (
                      <div className="flex items-center gap-2">
                        <span>
                          {t('ieltsScore')} {ieltsScore}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
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

              {/* Languages */}
              {languages && (
                <div>
                  <p className="text-sm font-semibold text-gray-500">{t('languages')}</p>
                  <p className="text-sm text-gray-700 font-medium">{languages}</p>
                </div>
              )}

              {/* Career Goal */}
              {careerGoal && (
                <div>
                  <p className="text-sm font-semibold text-gray-500">{t('careerGoal')}</p>
                  <p className="text-sm text-gray-700 font-medium">{careerGoal}</p>
                </div>
              )}

              {/* Research Interest */}
              {researchInterest && (
                <div>
                  <p className="text-sm font-semibold text-gray-500">{t('researchInterest')}</p>
                  <p className="text-sm text-gray-700 font-medium">{researchInterest}</p>
                </div>
              )}

              {/* Academic Awards */}
              {academicAwards && (
                <div>
                  <p className="text-sm font-semibold text-gray-500">{t('academicAwards')}</p>
                  <p className="text-sm text-gray-700 font-medium">{academicAwards}</p>
                </div>
              )}

              {/* Publication Count */}
              {publicationCount !== undefined && publicationCount !== null && (
                <div>
                  <p className="text-sm font-semibold text-gray-500">{t('publicationCount')}</p>
                  <p className="text-sm text-gray-700 font-medium">{publicationCount}</p>
                </div>
              )}

              {/* Work Experience Years */}
              {workExperienceYears !== undefined && workExperienceYears !== null && (
                <div>
                  <p className="text-sm font-semibold text-gray-500">{t('workExperienceYears')}</p>
                  <p className="text-sm text-gray-700 font-medium">
                    {workExperienceYears} {t('years')}
                  </p>
                </div>
              )}

              {/* Athletic Information */}
              {isAthlete && (
                <div>
                  <p className="text-sm font-semibold text-gray-500">{t('isAthlete')}</p>
                  <Badge
                    variant="outline"
                    className="text-xs bg-green-50 text-blue-700 border-blue-200"
                  >
                    {t('yes')}
                  </Badge>
                  {athleticAchievements && (
                    <div className="mt-2">
                      <p className="text-sm font-semibold text-gray-500">
                        {t('athleticAchievements')}
                      </p>
                      <p className="text-sm text-gray-700 font-medium">{athleticAchievements}</p>
                    </div>
                  )}
                </div>
              )}
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

          {/* Documents Section */}
          {imageFiles.length > 0 && documentFiles.length > 0 && (
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">{t('documents')}</h3>
              <div className="bg-white rounded-lg border-2 border-gray-200 p-4 mb-4 space-y-4">
                {/* Images */}
                {imageFiles.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <ImageIcon className="w-4 h-4 text-gray-600" />
                      <h4 className="text-sm font-semibold text-gray-700">{t('images')}</h4>
                      <Badge variant="outline" className="text-xs">
                        {imageFiles.length}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {imageFiles.map((media) => (
                        <div
                          key={media.id}
                          className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 transition-colors "
                          // onClick={() => setSelectedImage(media.url)}
                        >
                          <Image
                            src={media.thumbnail || media.url}
                            alt={media.fileName}
                            fill
                            className="object-cover "
                          />
                          {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                              {t('clickToView')}
                            </span>
                          </div> */}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Files */}
                {documentFiles.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-gray-600" />
                      <h4 className="text-sm font-semibold text-gray-700">{t('files')}</h4>
                      <Badge variant="outline" className="text-xs">
                        {documentFiles.length}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {documentFiles.map((media) => {
                        const FileIcon = getFileIcon(media.contentType);
                        return (
                          <a
                            key={media.id}
                            href={media.url}
                            target="_blank"
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                          >
                            <FileIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {media.fileName}
                              </p>
                              <p className="text-xs text-gray-500">{formatFileSize(media.size)}</p>
                            </div>
                            <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {applicationMedias && applicationMedias.length === 0 && (
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">{t('documents')}</h3>
              <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
                <p className="text-sm text-gray-600 bg-gray-50 rounded-md p-3 leading-relaxed">
                  {t('noDocumentsProvided')}
                </p>
              </div>
            </section>
          )}

          {/* Application History Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">{t('applicationHistory')}</h3>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
              <div className="space-y-6 pl-2 border-l-2 border-blue-200">
                {/* review status */}
                {reviewedAt && (
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
                )}
                {/* submission date */}
                {appliedAt && (
                  <div className="flex items-start gap-4">
                    <div className="w-4 h-4 rounded-full bg-blue-500 border-2 mt-1 border-white"></div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-blue-500">{t('submissionDate')}</p>
                      <p className="text-sm text-gray-500">{formatDateTime(appliedAt)}</p>
                      {scholarship && <p className="text-sm text-gray-500">{scholarship.title}</p>}
                    </div>
                  </div>
                )}
                {/* created date */}
                {applicationCreatedDate && (
                  <div className="flex items-start gap-4">
                    <div className="w-4 h-4 rounded-full bg-gray-500 border-2 mt-1 border-white"></div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-gray-500">{t('createdDate')}</p>
                      <p className="text-sm text-gray-500">
                        {formatDateTime(applicationCreatedDate)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </SheetContent>

      {/* Image Lightbox */}
      {/* {selectedImage && (
        <div
          className="fixed z-[9999] inset-0 bg-black/90  flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <div className="relative z-[99999] max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage}
              alt={t('viewFullSize')}
              fill
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )} */}
    </Sheet>
  );
}
