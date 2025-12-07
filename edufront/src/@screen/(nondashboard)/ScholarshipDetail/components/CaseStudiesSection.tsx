'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type CaseStudiesSectionProps = {
  caseStudies?: CaseStudy[];
};

export default function CaseStudiesSection({ caseStudies }: CaseStudiesSectionProps) {
  const t = useTranslations('scholarshipDetail.content');
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }

  const toggleExpand = (id?: number) => {
    if (!id) return;
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getApplicantName = (caseStudy: CaseStudy): string => {
    if (caseStudy.profileVo) {
      const firstName = caseStudy.profileVo.firstName || '';
      const lastName = caseStudy.profileVo.lastName || '';
      return `${firstName} ${lastName}`.trim() || 'Anonymous';
    }
    return 'Anonymous';
  };

  return (
    <section className="mb-6 border-t border-gray-200 pt-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{t('caseStudies')}</h2>
      <div className="space-y-3">
        {caseStudies.map((caseStudy) => {
          const isExpanded = caseStudy.id ? expandedIds.has(caseStudy.id) : false;
          const applicantName = getApplicantName(caseStudy);

          return (
            <div
              key={caseStudy.id}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
            >
              {/* Header - Clickable */}
              <button
                type="button"
                onClick={() => toggleExpand(caseStudy.id)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 flex items-center gap-2 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-900 font-bold text-xs">
                        {applicantName
                          .split(' ')
                          .map((name) => name[0].toUpperCase())
                          .join('')}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">{applicantName}:</span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">
                    {caseStudy.title || 'Untitled Case Study'}
                  </h3>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && caseStudy.content && (
                <div className="px-4 pb-4 border-t border-gray-200 pt-4">
                  {/* Images if available */}
                  {caseStudy.medias && caseStudy.medias.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                      {caseStudy.medias.map((media) => (
                        <div
                          key={media.id}
                          className="relative aspect-video rounded-lg overflow-hidden border border-gray-200"
                        >
                          <Image
                            src={media.url || media.thumbnail || ''}
                            alt="Case study image"
                            fill
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div
                    className="text-gray-700 leading-relaxed text-sm prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: caseStudy.content }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
