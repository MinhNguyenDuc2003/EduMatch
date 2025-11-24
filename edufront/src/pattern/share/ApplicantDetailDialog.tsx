'use client';

import {
  X,
  Phone,
  Mail,
  GraduationCap,
  Star,
  Award,
  Target,
  Briefcase,
  TrendingUp,
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/lib/cus/sheet';
import { Avatar, AvatarFallback } from '@/lib/cus/avatar';
import { useTranslations } from 'next-intl';

interface ApplicantDetailDialogProps {
  applicant: ApplicantProfile | null;
  open: boolean;
  onClose: () => void;
}

export default function ApplicantDetailDialog({
  applicant,
  open,
  onClose,
}: ApplicantDetailDialogProps) {
  const t = useTranslations('provider.favourite.detail');

  if (!applicant) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full p-4 sm:max-w-2xl max-h-[95vh] overflow-y-auto [&>button]:hidden rounded-xl !right-4 !top-1/2 !-translate-y-1/2 scrollbar-hide"
      >
        <SheetHeader className="!p-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-bold text-gray-900">
              {applicant.firstName} {applicant.lastName}
            </SheetTitle>
            <SheetClose className="rounded-full bg-white p-2 shadow-lg ring-1 ring-gray-200 transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0">
              <X className="h-4 w-4 text-gray-700" />
              <span className="sr-only">{t('close') || 'Close'}</span>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Personal Detail Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              {t('personalInfo') || 'Personal Information'}
            </h3>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4 space-y-4">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-[#3D6CB9] text-white text-lg font-semibold">
                    {applicant.firstName?.charAt(0).toUpperCase()}
                    {applicant.lastName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold text-gray-900">
                    {applicant.firstName} {applicant.lastName}
                  </h4>
                  <div className="flex text-sm text-gray-500 items-center font-semibold gap-8">
                    {applicant.phoneNumber && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{applicant.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Additional Information */}
              <div className="text-sm bg-gray-100 rounded-md p-3">
                <p className="text-sm font-semibold text-gray-600 mb-2">
                  {t('additionalInformation') || 'Additional Information'}
                </p>
                <div className="grid text-sm text-gray-500 items-center font-semibold grid-cols-2 gap-2">
                  {applicant.hometown && (
                    <div className="flex items-center gap-2">
                      <span>
                        {t('hometown') || 'Hometown'}: {applicant.hometown}
                      </span>
                    </div>
                  )}
                  {applicant.citizenshipStatus && (
                    <div className="flex items-center gap-2">
                      <span>
                        {t('citizenship') || 'Citizenship'}: {applicant.citizenshipStatus}
                      </span>
                    </div>
                  )}
                  {applicant.race && (
                    <div className="flex items-center gap-2">
                      <span>
                        {t('race') || 'Race'}: {applicant.race}
                      </span>
                    </div>
                  )}
                  {applicant.ethnicity && (
                    <div className="flex items-center gap-2">
                      <span>
                        {t('ethnicity') || 'Ethnicity'}: {applicant.ethnicity}
                      </span>
                    </div>
                  )}
                  {applicant.religion && (
                    <div className="flex items-center gap-2">
                      <span>
                        {t('religion') || 'Religion'}: {applicant.religion}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* GPA Section */}
          {applicant.overallGpa && (
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">{t('gpa') || 'GPA'}</h3>
              <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <span>
                    {t('overallGpa') || 'Overall GPA'}: {applicant.overallGpa.toFixed(2)}
                  </span>
                </div>
              </div>
            </section>
          )}

          {/* Education Background Section */}
          {applicant.educationHistories && applicant.educationHistories.length > 0 && (
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {t('educationHistory') || 'Education History'}
              </h3>
              {applicant.educationHistories.map((edu) => (
                <div key={edu.id} className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
                  <div className="grid text-sm text-gray-700 items-start font-medium grid-cols-2 gap-2">
                    <div className="col-span-2 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      <span>
                        {t('school') || 'School'}: {edu.institutionName || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        {t('major') || 'Major'}: {edu.majorName || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        {t('degreeType') || 'Degree'}: {edu.degreeType || 'N/A'}
                      </span>
                    </div>
                    {edu.gpa && (
                      <div className="flex items-center gap-2">
                        <span>
                          {t('gpa') || 'GPA'}: {edu.gpa.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {edu.graduationYear && (
                      <div className="flex items-center gap-2">
                        <span>
                          {t('graduationYear') || 'Graduation Year'}: {edu.graduationYear}
                        </span>
                      </div>
                    )}
                    {edu.country && (
                      <div className="flex items-center gap-2">
                        <span>
                          {t('country') || 'Country'}: {edu.country}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Skills & Achievements Section */}
          {applicant.skills && applicant.skills.length > 0 && (
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">{t('skills') || 'Skills'}</h3>
              <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
                <div className="flex flex-wrap gap-2">
                  {applicant.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="bg-gray-100 rounded-md px-3 py-1 text-sm text-gray-700 font-medium"
                    >
                      {skill.skillName}
                      {skill.proficiencyLevel && (
                        <span className="text-xs text-gray-500 ml-2">
                          ({skill.proficiencyLevel})
                        </span>
                      )}
                      {skill.yearsExperience > 0 && (
                        <span className="text-xs text-gray-500">
                          {' '}
                          • {skill.yearsExperience} years
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Certificates Section */}
          {applicant.certificates && applicant.certificates.length > 0 && (
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {t('certificates') || 'Certificates'}
              </h3>
              <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4 space-y-3">
                {applicant.certificates.map((cert) => (
                  <div key={cert.id} className="bg-gray-100 rounded-md p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{cert.certificateName}</span>
                      {cert.score && (
                        <span className="bg-[#3D6CB9] text-white px-2 py-1 rounded text-xs font-medium">
                          {cert.score}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{cert.issuedBy}</p>
                    <div className="flex gap-4 text-xs text-gray-500 mt-1">
                      <span>
                        {t('issueDate') || 'Issue'}: {new Date(cert.issueDate).toLocaleDateString()}
                      </span>
                      {cert.expiryDate && (
                        <span>
                          {t('expiryDate') || 'Expires'}:{' '}
                          {new Date(cert.expiryDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Intentions Section */}
          {applicant.intentions && applicant.intentions.length > 0 && (
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {t('intentions') || 'Study Intentions'}
              </h3>
              <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4 space-y-3">
                {applicant.intentions.map((intention) => (
                  <div key={intention.id} className="bg-gray-100 rounded-md p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">
                        {intention.intendedInstitution}
                      </span>
                    </div>
                    <div className="grid text-sm text-gray-700 items-center font-medium grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <span>
                          {t('major') || 'Major'}: {intention.intendedMajorName || 'N/A'}
                        </span>
                      </div>
                      {intention.degreeType && (
                        <div className="flex items-center gap-2">
                          <span>
                            {t('degreeType') || 'Degree'}: {intention.degreeType}
                          </span>
                        </div>
                      )}
                      {intention.intendedCountry && (
                        <div className="flex items-center gap-2">
                          <span>
                            {t('country') || 'Country'}: {intention.intendedCountry}
                          </span>
                        </div>
                      )}
                      {intention.expectedGraduationYear && (
                        <div className="flex items-center gap-2">
                          <span>
                            {t('expectedGraduation') || 'Expected Graduation'}:{' '}
                            {intention.expectedGraduationYear}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Activities & Interests Section */}
          {(applicant.favoriteActivities ||
            applicant.sportsParticipated ||
            applicant.studentActivities ||
            applicant.organizationsJoined) && (
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {t('activities') || 'Activities & Interests'}
              </h3>
              <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4 space-y-3">
                {applicant.favoriteActivities && (
                  <div className="bg-gray-100 rounded-md p-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      {t('favoriteActivities') || 'Favorite Activities'}
                    </p>
                    <p className="text-sm text-gray-600">{applicant.favoriteActivities}</p>
                  </div>
                )}
                {applicant.sportsParticipated && (
                  <div className="bg-gray-100 rounded-md p-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      {t('sports') || 'Sports'}
                    </p>
                    <p className="text-sm text-gray-600">{applicant.sportsParticipated}</p>
                  </div>
                )}
                {applicant.studentActivities && (
                  <div className="bg-gray-100 rounded-md p-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      {t('studentActivities') || 'Student Activities'}
                    </p>
                    <p className="text-sm text-gray-600">{applicant.studentActivities}</p>
                  </div>
                )}
                {applicant.organizationsJoined && (
                  <div className="bg-gray-100 rounded-md p-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      {t('organizations') || 'Organizations'}
                    </p>
                    <p className="text-sm text-gray-600">{applicant.organizationsJoined}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Career Goals Section */}
          {applicant.careerGoals && (
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {t('careerGoals') || 'Career Goals'}
              </h3>
              <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-semibold text-gray-700">
                    {t('careerGoals') || 'Career Goals'}
                  </p>
                </div>
                <p className="text-sm text-gray-600">{applicant.careerGoals}</p>
              </div>
            </section>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
