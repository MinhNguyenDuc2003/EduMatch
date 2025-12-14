import { formatDate } from '@/utils/formatDate';
import React from 'react';
import { useTranslations } from 'next-intl';

const ApplicantDetail = ({ applicant }: { applicant: ApplicantProfile }) => {
  const t = useTranslations('aiApplicantSuggestions');
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-4 p-2 sm:p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">
              {applicant.firstName} {applicant.lastName}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">{applicant.contactName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              {t('detail.emailContact')}
            </p>
            <p className="font-medium text-sm sm:text-base">{applicant.contactName}</p>
          </div>
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              {t('detail.phone')}
            </p>
            <p className="font-medium text-sm sm:text-base">{applicant.phoneNumber}</p>
          </div>
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              {t('detail.hometown')}
            </p>
            <p className="font-medium text-sm sm:text-base">{applicant.hometown}</p>
          </div>
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              {t('detail.citizenship')}
            </p>
            <p className="font-medium text-sm sm:text-base">{applicant.citizenshipStatus}</p>
          </div>
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              {t('detail.ethnicity')}
            </p>
            <p className="font-medium text-sm sm:text-base">{applicant.ethnicity}</p>
          </div>
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              {t('detail.religion')}
            </p>
            <p className="font-medium text-sm sm:text-base">{applicant.religion}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              {t('detail.race')}
            </p>
            <p className="font-medium text-sm sm:text-base">{applicant.race}</p>
          </div>
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              {t('detail.disabilities')}
            </p>
            <p className="font-medium text-sm sm:text-base">{applicant.disabilities}</p>
          </div>
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              {t('detail.medicalConditions')}
            </p>
            <p className="font-medium text-sm sm:text-base">{applicant.medicalConditions}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <h4 className="font-semibold mb-3 flex flex-col sm:flex-row items-start sm:items-center gap-2">
              {t('detail.overallGpa')}
              <span
                className="text-lg font-bold px-3 py-1 rounded"
                style={{ backgroundColor: '#3d6cb9', color: 'white' }}
              >
                {applicant.overallGpa}
              </span>
            </h4>
          </div>
          {applicant.educationLevel && (
            <div className="bg-muted/30 p-3 sm:p-4 rounded">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                {t('detail.educationLevel')}
              </p>
              <p className="font-medium text-sm sm:text-base">{applicant.educationLevel}</p>
            </div>
          )}
        </div>

        {/* Test Scores */}
        {(applicant.satScore ||
          applicant.actScore ||
          applicant.greScore ||
          applicant.gmatScore ||
          applicant.toeflScore ||
          applicant.ieltsScore) && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <h4 className="font-semibold mb-3 text-base sm:text-lg">{t('detail.testScores')}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {applicant.satScore && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    {t('detail.satScore')}
                  </p>
                  <p className="font-medium text-sm sm:text-base">{applicant.satScore}/1600</p>
                </div>
              )}
              {applicant.actScore && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    {t('detail.actScore')}
                  </p>
                  <p className="font-medium text-sm sm:text-base">{applicant.actScore}/36</p>
                </div>
              )}
              {applicant.greScore && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    {t('detail.greScore')}
                  </p>
                  <p className="font-medium text-sm sm:text-base">{applicant.greScore}/340</p>
                </div>
              )}
              {applicant.gmatScore && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    {t('detail.gmatScore')}
                  </p>
                  <p className="font-medium text-sm sm:text-base">{applicant.gmatScore}/800</p>
                </div>
              )}
              {applicant.toeflScore && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    {t('detail.toeflScore')}
                  </p>
                  <p className="font-medium text-sm sm:text-base">{applicant.toeflScore}/120</p>
                </div>
              )}
              {applicant.ieltsScore && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    {t('detail.ieltsScore')}
                  </p>
                  <p className="font-medium text-sm sm:text-base">{applicant.ieltsScore}/9.0</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Languages and Academic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          {applicant.languages && (
            <div className="bg-muted/30 p-3 sm:p-4 rounded">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                {t('detail.languages')}
              </p>
              <p className="text-xs sm:text-sm">{applicant.languages}</p>
            </div>
          )}
          {applicant.academicAwards && (
            <div className="bg-muted/30 p-3 sm:p-4 rounded">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                {t('detail.academicAwards')}
              </p>
              <p className="text-xs sm:text-sm">{applicant.academicAwards}</p>
            </div>
          )}
          {applicant.publicationCount !== undefined && applicant.publicationCount !== null && (
            <div className="bg-muted/30 p-3 sm:p-4 rounded">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                {t('detail.publicationCount')}
              </p>
              <p className="font-medium text-sm sm:text-base">{applicant.publicationCount}</p>
            </div>
          )}
        </div>

        {applicant.educationHistories && applicant.educationHistories.length > 0 && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <h4 className="font-semibold mb-3 text-base sm:text-lg">
              {t('detail.educationHistory')}
            </h4>
            <div className="space-y-3">
              {applicant.educationHistories.map((edu) => (
                <div key={edu.id} className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
                  <p className="font-medium text-sm sm:text-base">{edu.institutionName}</p>
                  <p className="text-xs sm:text-sm">
                    {edu.degreeType} {t('detail.in')} {edu.majorName} ({edu.majorCategory})
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {edu.country} • {edu.state} • {t('detail.classOf')} {edu.graduationYear}
                  </p>
                  <p className="text-xs sm:text-sm">
                    {t('detail.gpa')}: {edu.gpa} • {t('detail.classRank')}: {edu.classRank}
                  </p>
                  <p className="text-xs sm:text-sm">
                    {t('detail.classSize')}: {edu.classSize}
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    {t('detail.enrollment')}: {formatDate(Number(edu.enrollmentStartDate))}{' '}
                    {t('detail.to')} {formatDate(Number(edu.enrollmentEndDate))}
                  </p>
                  {edu.notes && (
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {t('detail.note')}: {edu.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {applicant.certificates && applicant.certificates.length > 0 && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <h4 className="font-semibold mb-3 text-base sm:text-lg">{t('detail.certificates')}</h4>
            <div className="space-y-2">
              {applicant.certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm sm:text-base">{cert.certificateName}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {t('detail.issuedBy')} {cert.issuedBy}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(Number(cert.issueDate))} - {formatDate(Number(cert.expiryDate))}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm sm:text-base" style={{ color: '#3d6cb9' }}>
                      {cert.score}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {applicant.skills && applicant.skills.length > 0 && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <h4 className="font-semibold mb-3 text-base sm:text-lg">{t('detail.skills')}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {applicant.skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium text-xs sm:text-sm">{skill.skillName}</p>
                    <p className="text-xs text-muted-foreground">
                      {skill.proficiencyLevel} • {skill.yearsExperience}
                      {t('detail.years')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          {applicant.favoriteActivities && (
            <div className="bg-muted/30 p-3 sm:p-4 rounded">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                {t('detail.favoriteActivities')}
              </p>
              <p className="text-xs sm:text-sm">{applicant.favoriteActivities}</p>
            </div>
          )}
          {applicant.sportsParticipated && (
            <div className="bg-muted/30 p-3 sm:p-4 rounded">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                {t('detail.sports')}
              </p>
              <p className="text-xs sm:text-sm">{applicant.sportsParticipated}</p>
            </div>
          )}
          {applicant.studentActivities && (
            <div className="bg-muted/30 p-3 sm:p-4 rounded">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                {t('detail.studentActivities')}
              </p>
              <p className="text-xs sm:text-sm">{applicant.studentActivities}</p>
            </div>
          )}
          {applicant.organizationsJoined && (
            <div className="bg-muted/30 p-3 sm:p-4 rounded">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                {t('detail.organizations')}
              </p>
              <p className="text-xs sm:text-sm">{applicant.organizationsJoined}</p>
            </div>
          )}
        </div>

        {applicant.researchExperience && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
              {t('detail.researchExperience')}
            </p>
            <p className="text-xs sm:text-sm">{applicant.researchExperience}</p>
          </div>
        )}

        {applicant.researchInterest && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
              {t('detail.researchInterest')}
            </p>
            <p className="text-xs sm:text-sm">{applicant.researchInterest}</p>
          </div>
        )}

        {applicant.extracurricularActivities && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
              {t('detail.extracurricularActivities')}
            </p>
            <p className="text-xs sm:text-sm">{applicant.extracurricularActivities}</p>
          </div>
        )}

        {applicant.careerGoals && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
              {t('detail.careerGoals')}
            </p>
            <p className="text-xs sm:text-sm">{applicant.careerGoals}</p>
          </div>
        )}

        {/* Preferred Scholarship Information */}
        {(applicant.preferredScholarshipType ||
          applicant.preferredCountry ||
          applicant.preferredMajor) && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <h4 className="font-semibold mb-3 text-base sm:text-lg">
              {t('detail.preferredScholarship')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {applicant.preferredScholarshipType && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    {t('detail.preferredType')}
                  </p>
                  <p className="font-medium text-sm sm:text-base">
                    {applicant.preferredScholarshipType}
                  </p>
                </div>
              )}
              {applicant.preferredCountry && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    {t('detail.preferredCountry')}
                  </p>
                  <p className="font-medium text-sm sm:text-base">{applicant.preferredCountry}</p>
                </div>
              )}
              {applicant.preferredMajor && (
                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    {t('detail.preferredMajor')}
                  </p>
                  <p className="font-medium text-sm sm:text-base">{applicant.preferredMajor}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {applicant.intentions && applicant.intentions.length > 0 && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <h4 className="font-semibold mb-3 text-base sm:text-lg">
              {t('detail.futureIntentions')}
            </h4>
            <div className="space-y-3">
              {applicant.intentions.map((intention) => (
                <div key={intention.id} className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
                  <p className="font-medium text-sm sm:text-base">
                    {intention.intendedInstitution}
                  </p>
                  <p className="text-xs sm:text-sm">
                    {intention.degreeType} {t('detail.in')} {intention.intendedMajorName} (
                    {intention.intendedMajorCategory})
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {intention.intendedCountry} • {intention.intendedState}
                  </p>
                  <p className="text-xs sm:text-sm">
                    {t('detail.expectedStart')}: {formatDate(Number(intention.expectedStartDate))}
                  </p>
                  <p className="text-xs sm:text-sm">
                    {t('detail.expectedGraduation')}: {intention.expectedGraduationYear}
                  </p>
                  {intention.notes && (
                    <p className="text-xs sm:text-sm text-muted-foreground italic mt-1">
                      {intention.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {applicant.applicantPreferences && applicant.applicantPreferences.length > 0 && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <h4 className="font-semibold mb-3 text-base sm:text-lg">{t('detail.preferences')}</h4>
            <div className="space-y-2">
              {applicant.applicantPreferences.map((pref) => (
                <div
                  key={pref.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div>
                    <p className="font-medium text-xs sm:text-sm">{pref.type}</p>
                    <p className="text-xs text-muted-foreground">{pref.value}</p>
                    {pref.note && (
                      <p className="text-xs text-muted-foreground italic">{pref.note}</p>
                    )}
                  </div>
                  <div className="text-sm font-medium" style={{ color: '#3d6cb9' }}>
                    {t('detail.weight')}: {(pref.weight * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {applicant.militaryFamilyHistory && (
          <div className="bg-blue-50 border border-blue-200 p-3 sm:p-4 rounded">
            <p className="text-xs sm:text-sm font-semibold" style={{ color: '#3d6cb9' }}>
              {t('detail.militaryFamilyHistory')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantDetail;
