'use client';
import { Button } from '@/pattern/cus/button';
import { useTranslations } from 'next-intl';

type ScholarshipContentProps = {
  scholarship: Scholarship;
};

export default function ScholarshipContent({ scholarship }: ScholarshipContentProps) {
  const t = useTranslations('scholarshipDetail.content');

  return (
    <>
      {/* Description Section */}
      <section className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-3">{t('description')}</h2>
        <p className="text-gray-700 leading-relaxed text-sm">
          {scholarship.description ||
            'Body text for whatever you would like to add more to the main point. It provides details, explanations, and context.'}
        </p>
      </section>

      {/* Details Section */}
      <section className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-3">{t('details')}</h2>
        <p className="text-gray-700 leading-relaxed text-sm">
          {scholarship.shortDescription ||
            'Body text for whatever would like to add more to the main point. It provides details, explanations, and context.'}
        </p>
      </section>

      {/* Basic Information Section */}
      {(scholarship.scholarshipType || scholarship.country || scholarship.university) && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            {t('basicInformation')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scholarship.scholarshipType && (
              <div>
                <p className="text-xs text-gray-500 mb-1">{t('scholarshipType')}</p>
                <p className="text-sm font-medium text-gray-900">{scholarship.scholarshipType}</p>
              </div>
            )}
            {scholarship.country && (
              <div>
                <p className="text-xs text-gray-500 mb-1">{t('country')}</p>
                <p className="text-sm font-medium text-gray-900">{scholarship.country}</p>
              </div>
            )}
            {scholarship.university && (
              <div>
                <p className="text-xs text-gray-500 mb-1">{t('university')}</p>
                <p className="text-sm font-medium text-gray-900">{scholarship.university}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Academic Requirements Section */}
      {(scholarship.studyLevel ||
        scholarship.fields ||
        scholarship.requiredMajor ||
        scholarship.gpaRequirement !== undefined ||
        scholarship.requiredClassRankPercentile !== undefined ||
        scholarship.requiredPublicationCount !== undefined ||
        scholarship.requiredAcademicAwards) && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            {t('academicRequirements')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scholarship.studyLevel && (
              <div>
                <p className="text-xs text-gray-500 mb-1">{t('studyLevel')}</p>
                <p className="text-sm font-medium text-gray-900">{scholarship.studyLevel}</p>
              </div>
            )}
            {scholarship.fields && (
              <div>
                <p className="text-xs text-gray-500 mb-1">{t('fields')}</p>
                <p className="text-sm font-medium text-gray-900">{scholarship.fields}</p>
              </div>
            )}
            {scholarship.requiredMajor && (
              <div>
                <p className="text-xs text-gray-500 mb-1">{t('requiredMajor')}</p>
                <p className="text-sm font-medium text-gray-900">{scholarship.requiredMajor}</p>
              </div>
            )}
            {scholarship.gpaRequirement !== undefined && scholarship.gpaRequirement !== null && (
              <div>
                <p className="text-xs text-gray-500 mb-1">{t('gpaRequirement')}</p>
                <p className="text-sm font-medium text-gray-900">
                  {scholarship.gpaRequirement.toFixed(2)}
                </p>
              </div>
            )}
            {scholarship.requiredClassRankPercentile !== undefined &&
              scholarship.requiredClassRankPercentile !== null && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">{t('requiredClassRankPercentile')}</p>
                  <p className="text-sm font-medium text-gray-900">
                    Top {scholarship.requiredClassRankPercentile}%
                  </p>
                </div>
              )}
            {scholarship.requiredPublicationCount !== undefined &&
              scholarship.requiredPublicationCount !== null &&
              scholarship.requiredPublicationCount > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">{t('requiredPublicationCount')}</p>
                  <p className="text-sm font-medium text-gray-900">
                    {scholarship.requiredPublicationCount} {t('publications')}
                  </p>
                </div>
              )}
            {scholarship.requiredAcademicAwards && (
              <div>
                <p className="text-xs text-gray-500 mb-1">{t('requiredAcademicAwards')}</p>
                <p className="text-sm font-medium text-gray-900">
                  {scholarship.requiredAcademicAwards}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Test Score Requirements Section */}
      {(scholarship.requiredSatScore ||
        scholarship.requiredActScore ||
        scholarship.requiredGreScore ||
        scholarship.requiredToeflScore ||
        scholarship.requiredIeltsScore) && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            {t('testScoreRequirements')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scholarship.requiredSatScore !== undefined &&
              scholarship.requiredSatScore !== null &&
              scholarship.requiredSatScore > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">{t('requiredSatScore')}</p>
                  <p className="text-sm font-medium text-gray-900">
                    {scholarship.requiredSatScore}
                  </p>
                </div>
              )}
            {scholarship.requiredActScore !== undefined &&
              scholarship.requiredActScore !== null &&
              scholarship.requiredActScore > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">{t('requiredActScore')}</p>
                  <p className="text-sm font-medium text-gray-900">
                    {scholarship.requiredActScore}
                  </p>
                </div>
              )}
            {scholarship.requiredGreScore !== undefined &&
              scholarship.requiredGreScore !== null &&
              scholarship.requiredGreScore > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">{t('requiredGreScore')}</p>
                  <p className="text-sm font-medium text-gray-900">
                    {scholarship.requiredGreScore}
                  </p>
                </div>
              )}
            {scholarship.requiredToeflScore !== undefined &&
              scholarship.requiredToeflScore !== null &&
              scholarship.requiredToeflScore > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">{t('requiredToeflScore')}</p>
                  <p className="text-sm font-medium text-gray-900">
                    {scholarship.requiredToeflScore}
                  </p>
                </div>
              )}
            {scholarship.requiredIeltsScore !== undefined &&
              scholarship.requiredIeltsScore !== null &&
              scholarship.requiredIeltsScore > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">{t('requiredIeltsScore')}</p>
                  <p className="text-sm font-medium text-gray-900">
                    {scholarship.requiredIeltsScore}
                  </p>
                </div>
              )}
          </div>
        </section>
      )}

      {/* Demographic Requirements Section */}
      {(scholarship.minAge ||
        scholarship.maxAge ||
        scholarship.genderRequirement ||
        scholarship.restrictedNationalities) && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            {t('demographicRequirements')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(scholarship.minAge || scholarship.maxAge) && (
              <div>
                <p className="text-xs text-gray-500 mb-1">{t('ageRange')}</p>
                <p className="text-sm font-medium text-gray-900">
                  {scholarship.minAge && scholarship.maxAge
                    ? `${scholarship.minAge} - ${scholarship.maxAge} ${t('years')}`
                    : scholarship.minAge
                      ? `${t('minimum')} ${scholarship.minAge} ${t('years')}`
                      : scholarship.maxAge
                        ? `${t('maximum')} ${scholarship.maxAge} ${t('years')}`
                        : t('notAvailable')}
                </p>
              </div>
            )}
            {scholarship.genderRequirement && (
              <div>
                <p className="text-xs text-gray-500 mb-1">{t('genderRequirement')}</p>
                <p className="text-sm font-medium text-gray-900">{scholarship.genderRequirement}</p>
              </div>
            )}
            {scholarship.restrictedNationalities && (
              <div>
                <p className="text-xs text-gray-500 mb-1">{t('restrictedNationalities')}</p>
                <p className="text-sm font-medium text-gray-900">
                  {scholarship.restrictedNationalities}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Other Requirements Section */}
      {(scholarship.requiredWorkExperienceYears ||
        scholarship.languageRequirement ||
        scholarship.availableSlots) && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            {t('otherRequirements')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scholarship.requiredWorkExperienceYears !== undefined &&
              scholarship.requiredWorkExperienceYears !== null &&
              scholarship.requiredWorkExperienceYears > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">{t('requiredWorkExperienceYears')}</p>
                  <p className="text-sm font-medium text-gray-900">
                    {scholarship.requiredWorkExperienceYears} {t('years')}
                  </p>
                </div>
              )}
            {scholarship.languageRequirement && (
              <div>
                <p className="text-xs text-gray-500 mb-1">{t('languageRequirement')}</p>
                <p className="text-sm font-medium text-gray-900">
                  {scholarship.languageRequirement}
                </p>
              </div>
            )}
            {scholarship.availableSlots !== undefined &&
              scholarship.availableSlots !== null &&
              scholarship.availableSlots > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">{t('availableSlots')}</p>
                  <p className="text-sm font-medium text-gray-900">{scholarship.availableSlots}</p>
                </div>
              )}
          </div>
        </section>
      )}

      {/* Criteria Section */}
      {scholarship.requirements && (
        <section className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t('criteria')}</h2>
          <p className="text-gray-700 leading-relaxed text-sm">{scholarship.requirements}</p>
        </section>
      )}

      {/* Application Process Section */}
      {scholarship.benefits && (
        <section className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t('benefits')}</h2>
          <p className="text-gray-700 leading-relaxed text-sm">{scholarship.benefits}</p>
        </section>
      )}

      {/* Preferences Section */}
      {scholarship.scholarshipPreferences && scholarship.scholarshipPreferences.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t('preferences')}</h2>
          <div className="space-y-3">
            {scholarship.scholarshipPreferences.map((preference) => (
              <div key={preference.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900 text-sm">{preference.type}</span>
                      {/* {preference.weight && (
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                          Weight: {preference.weight}
                        </span>
                      )} */}
                    </div>
                    <p className="text-gray-700 text-sm mb-1">{preference.value}</p>
                    {preference.note && (
                      <p className="text-gray-600 text-xs italic mt-1">
                        {t('note')}: {preference.note}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
