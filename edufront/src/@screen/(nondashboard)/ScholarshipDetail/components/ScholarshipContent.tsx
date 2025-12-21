'use client';
import { Button } from '@/pattern/cus/button';
import { useTranslations } from 'next-intl';
import CaseStudiesSection from './CaseStudiesSection';

type ScholarshipContentProps = {
  scholarship: Scholarship;
};

export default function ScholarshipContent({ scholarship }: ScholarshipContentProps) {
  const t = useTranslations('scholarshipDetail.content');

  return (
    <>
      {/* Description Section */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-900">{t('description')}</h2>
        <p className=" leading-relaxed text-sm">
          {scholarship.description ||
            'Body text for whatever you would like to add more to the main point. It provides details, explanations, and context.'}
        </p>
      </section>

      {/* Details Section */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-900">{t('details')}</h2>
        <p className=" leading-relaxed text-sm">
          {scholarship.shortDescription ||
            'Body text for whatever would like to add more to the main point. It provides details, explanations, and context.'}
        </p>
        {scholarship.scholarshipType && (
          <div className="text-sm flex items-center gap-2">
            <p className=" text-gray-500">{t('scholarshipType')}:</p>
            <p className="font-medium text-gray-900">{scholarship.scholarshipType}</p>
          </div>
        )}
        {scholarship.country && (
          <div className="text-sm flex items-center gap-2">
            <p className=" text-gray-500">{t('country')}:</p>
            <p className="font-medium text-gray-900">{scholarship.country}</p>
          </div>
        )}
        {scholarship.university && (
          <div className="text-sm flex items-center gap-2">
            <p className=" text-gray-500">{t('university')}:</p>
            <p className="font-medium text-gray-900">{scholarship.university}</p>
          </div>
        )}
        {scholarship.availableSlots && (
          <div className="text-sm flex items-center gap-2">
            <p className=" text-gray-500">{t('availableSlots')}:</p>
            <p className="font-medium text-gray-900">{scholarship.availableSlots}</p>
          </div>
        )}
      </section>

      {/* Criteria Section */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-900">{t('criteria')}</h2>
        {scholarship.requirements && (
          <p className=" leading-relaxed text-sm">{scholarship.requirements}</p>
        )}
        {scholarship.studyLevel && (
          <div className="text-sm flex items-center gap-2">
            <p className=" text-gray-500">{t('studyLevel')}:</p>
            <p className="font-medium text-gray-900">{scholarship.studyLevel}</p>
          </div>
        )}
        {scholarship.fields && (
          <div className="text-sm flex items-center gap-2">
            <p className=" text-gray-500">{t('fields')}:</p>
            <p className="font-medium text-gray-900">{scholarship.fields}</p>
          </div>
        )}
        {scholarship.requiredMajor && (
          <div className="text-sm flex items-center gap-2">
            <p className=" text-gray-500">{t('requiredMajor')}:</p>
            <p className="font-medium text-gray-900">{scholarship.requiredMajor}</p>
          </div>
        )}
        {scholarship.gpaRequirement && (
          <div className="text-sm flex items-center gap-2">
            <p className=" text-gray-500">{t('gpaRequirement')}:</p>
            <p className="font-medium text-gray-900">{scholarship.gpaRequirement.toFixed(2)}</p>
          </div>
        )}
        {scholarship.requiredClassRankPercentile && (
          <div className="text-sm flex items-center gap-2">
            <p className=" text-gray-500">{t('requiredClassRankPercentile')}:</p>
            <p className="font-medium text-gray-900">
              Top {scholarship.requiredClassRankPercentile}%
            </p>
          </div>
        )}
        {(scholarship.requiredPublicationCount || 0) > 0 && (
          <div className="text-sm flex items-center gap-2">
            <p className=" text-gray-500">{t('requiredPublicationCount')}:</p>
            <p className="font-medium text-gray-900">
              {scholarship.requiredPublicationCount || 0} {t('publications')}
            </p>
          </div>
        )}
        {scholarship.requiredAcademicAwards && Number(scholarship.requiredAcademicAwards) > 0 && (
          <div className="text-sm flex items-center gap-2">
            <p className=" text-gray-500">{t('requiredAcademicAwards')}:</p>
            <p className="font-medium text-gray-900">{scholarship.requiredAcademicAwards}</p>
          </div>
        )}

        {/* Test Score Requirements Section */}
        {(scholarship.requiredSatScore ||
          scholarship.requiredActScore ||
          scholarship.requiredGreScore ||
          scholarship.requiredToeflScore ||
          scholarship.requiredIeltsScore ||
          scholarship.requiredGmatScore) && (
          <section className="flex flex-col mb-2 py-2 border-t border-gray-300">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">
              {t('testScoreRequirements')}
            </h2>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4">
                {scholarship.requiredToeflScore > 0 && (
                  <div className="col-span-1 lg:col-span-2">
                    <p className="text-xs text-gray-500">{t('requiredToeflScore')}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {scholarship.requiredToeflScore}
                    </p>
                  </div>
                )}
                {scholarship.requiredIeltsScore > 0 && scholarship.requiredToeflScore > 0 && (
                  <div className="col-span-1">
                    <span className="text-xs font-bold text-gray-500 mx-2">Or</span>
                  </div>
                )}
                {scholarship.requiredIeltsScore > 0 && (
                  <div className="col-span-1 lg:col-span-2">
                    <p className="text-xs text-gray-500">{t('requiredIeltsScore')}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {scholarship.requiredIeltsScore}
                    </p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4">
                {scholarship.requiredSatScore > 0 && (
                  <div className="col-span-1 lg:col-span-2">
                    <p className="text-xs text-gray-500">{t('requiredSatScore')}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {scholarship.requiredSatScore}
                    </p>
                  </div>
                )}
                {scholarship.requiredSatScore > 0 && scholarship.requiredActScore > 0 && (
                  <div className="col-span-1">
                    <span className="text-xs font-bold text-gray-500 mx-2">Or</span>
                  </div>
                )}
                {scholarship.requiredActScore > 0 && (
                  <div className="col-span-1 lg:col-span-2">
                    <p className="text-xs text-gray-500">{t('requiredActScore')}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {scholarship.requiredActScore}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4">
                {scholarship.requiredGreScore > 0 && (
                  <div className="col-span-1 lg:col-span-2">
                    <p className="text-xs text-gray-500">{t('requiredGreScore')}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {scholarship.requiredGreScore}
                    </p>
                  </div>
                )}
                {scholarship.requiredGreScore > 0 && scholarship.requiredGmatScore > 0 && (
                  <div className="col-span-1">
                    <span className="text-xs font-bold text-gray-500 mx-2">Or</span>
                  </div>
                )}
                {scholarship.requiredGmatScore > 0 && (
                  <div className="col-span-1 lg:col-span-2">
                    <p className="text-xs text-gray-500">{t('requiredGmatScore')}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {scholarship.requiredGmatScore}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Demographic Requirements Section */}
        {(scholarship.minAge ||
          scholarship.maxAge ||
          scholarship.genderRequirement ||
          scholarship.restrictedNationalities) && (
          <section className="flex flex-col mb-2 py-2 border-t border-gray-300">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">
              {t('demographicRequirements')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {(scholarship.minAge || scholarship.maxAge) && (
                <div className="text-sm">
                  <p className=" text-gray-500">{t('ageRange')}</p>
                  <p className="font-medium text-gray-900">
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
                <div className="text-sm">
                  <p className=" text-gray-500">{t('genderRequirement')}</p>
                  <p className="font-medium text-gray-900">{scholarship.genderRequirement}</p>
                </div>
              )}
              {scholarship.restrictedNationalities && (
                <div className="text-sm">
                  <p className=" text-gray-500">{t('restrictedNationalities')}</p>
                  <p className="font-medium text-gray-900">{scholarship.restrictedNationalities}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Other Requirements Section */}
        {(scholarship.requiredWorkExperienceYears || scholarship.languageRequirement) && (
          <section className="flex flex-col mb-2 py-2 border-t border-gray-300">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">{t('otherRequirements')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {scholarship.requiredWorkExperienceYears > 0 && (
                <div className="text-sm">
                  <p className=" text-gray-500">{t('requiredWorkExperienceYears')}</p>
                  <p className="font-medium text-gray-900">
                    {scholarship.requiredWorkExperienceYears} {t('years')}
                  </p>
                </div>
              )}
              {scholarship.languageRequirement && (
                <div className="text-sm">
                  <p className=" text-gray-500">{t('languageRequirement')}</p>
                  <p className="font-medium text-gray-900">{scholarship.languageRequirement}</p>
                </div>
              )}
            </div>
          </section>
        )}
      </section>
      {/* Application Process Section */}
      {scholarship.benefits && (
        <section className="mb-2">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t('benefits')}</h2>
          <p className="text-gray-700 leading-relaxed text-sm">{scholarship.benefits}</p>
        </section>
      )}
      {/* Case Studies Section */}

      <CaseStudiesSection caseStudies={scholarship.caseStudyVos} />
    </>
  );
}
