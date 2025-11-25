'use client';
import { Button } from '@/lib/cus/button';
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
        {scholarship.studyLevel || scholarship.scholarshipType || scholarship.fields ? (
          <div className="mt-3 space-y-2 text-gray-700 text-sm">
            <p>
              <span className="font-semibold">{t('studyLevel')}: </span>
              {scholarship.studyLevel || t('notAvailable')}
            </p>
            <p>
              <span className="font-semibold">{t('scholarshipType')}: </span>
              {scholarship.scholarshipType || t('notAvailable')}
            </p>
            <p>
              <span className="font-semibold">{t('fields')}: </span>
              {scholarship.fields || t('notAvailable')}
            </p>
            <p>
              <span className="font-semibold">{t('gpaRequirement')}: </span>
              {scholarship.gpaRequirement || t('notAvailable')}
            </p>
            <p>
              <span className="font-semibold">{t('languageRequirement')}: </span>
              {scholarship.languageRequirement || t('notAvailable')}
            </p>
            <p>
              <span className="font-semibold">{t('availableSlots')}: </span>
              {scholarship.availableSlots || t('notAvailable')}
            </p>
          </div>
        ) : null}
      </section>

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
                      <p className="text-gray-600 text-xs italic mt-1">{t('note')}: {preference.note}</p>
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
