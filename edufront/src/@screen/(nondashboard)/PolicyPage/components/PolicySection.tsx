'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

interface PolicySectionProps {
  sectionKey: string;
}

export default function PolicySection({ sectionKey }: PolicySectionProps) {
  const t = useTranslations(`policyPage.${sectionKey}`);

  const sections = t.raw('sections') as Array<{ title: string; content: string[] }> | undefined;

  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('title')}</h2>
      
      {t('introduction') && (
        <p className="text-base text-gray-700 leading-relaxed mb-6">{t('introduction')}</p>
      )}

      {sections && sections.length > 0 && (
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
              {section.content && section.content.length > 0 && (
                <ul className="list-disc list-inside space-y-2 text-base text-gray-700 leading-relaxed pl-4">
                  {section.content.map((item: string, itemIdx: number) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {t('lastUpdated') && (
        <p className="text-sm text-gray-500 mt-8 italic">{t('lastUpdated')}</p>
      )}
    </section>
  );
}

