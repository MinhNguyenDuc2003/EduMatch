'use client';

import { useState, useEffect } from 'react';
import { useScholarshipCompareStore } from '@/hooks/useScholarshipCompare';
import {
  X,
  ChevronUp,
  ChevronDown,
  ArrowRightLeft,
  Calendar,
  DollarSign,
  MapPin,
  GraduationCap,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Button } from '@/lib/cus/button';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/lib/cus/sheet';
import { useAuth } from '@/hooks/useAuth';
import { useAiComparisonQuery } from '@/state/apiScholarship';
import { Skeleton } from '@/lib/cus/skeleton';

export default function SelectedScholarshipCompare() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const { scholarships, removeScholarship, clearAll } = useScholarshipCompareStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCompareSheetOpen, setIsCompareSheetOpen] = useState(false);
  const t = useTranslations('selectedScholarshipCompare');
  const tCompare = useTranslations('scholarshipCompare');

  // Fetch AI comparison when sheet is open and we have at least 2 scholarships
  const scholarshipIds = scholarships.map((s) => s.id);
  console.log('scholarshipIds', scholarshipIds);
  const {
    data: comparisonResponse,
    isLoading: isLoadingComparison,
    isError: isErrorComparison,
  } = useAiComparisonQuery(scholarshipIds, {
    skip: !isCompareSheetOpen || scholarshipIds.length < 2,
  });

  // Parse comparison data from JSON string (similar to analyzeScholarship)
  const parseComparisonData = (): ScholarshipComparisonAnalysis | undefined => {
    if (!comparisonResponse) return undefined;
    try {
      const parsed = JSON.parse(comparisonResponse || '');
      return parsed.analysis;
    } catch (error) {
      console.log('Failed to parse comparison data:', error);
      return undefined;
    }
  };

  const comparisonData = parseComparisonData();

  if (pathname?.includes('/provider') || !isAuthenticated) {
    return null;
  }

  if (scholarships.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-[-1px] left-4 z-50 w-80">
      <div className="bg-white rounded-t-lg shadow-lg border border-gray-200 overflow-hidden">
        <div
          className="flex items-center justify-between gap-4 px-4 py-2 bg-[#3D6CB9] border-gray-200 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-sm">
              {t('title', { number: scholarships.length })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {scholarships.length > 0 && (
              <Button
                variant="custom"
                className="text-xs text-gray-900 hover:text-gray-200 !px-2 !py-1 !h-auto whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation();
                  clearAll();
                }}
              >
                {t('clearAll')}
              </Button>
            )}
            <div className={isExpanded ? 'rotate-180' : ''}>
              <ChevronUp className="w-4 h-4 text-white transition-transform" />
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="max-h-64 overflow-y-auto">
            {scholarships.map((scholarship) => (
              <div
                key={scholarship.id}
                className="flex items-center justify-between p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <p className="text-sm font-medium text-gray-900 truncate">{scholarship.title}</p>
                  {scholarship.university && (
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {scholarship.university}
                    </p>
                  )}
                </div>
                <Button
                  variant="custom"
                  className="text-gray-400 hover:text-red-600 !p-1 !h-auto flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeScholarship(scholarship.id);
                  }}
                  aria-label={t('remove')}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {scholarships.length >= 2 && (
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <Button
                  variant="custom"
                  className="w-full bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white !py-2 !h-auto text-sm font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCompareSheetOpen(true);
                  }}
                >
                  {t('compareButton')}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Compare Sheet */}
      <Sheet open={isCompareSheetOpen} onOpenChange={setIsCompareSheetOpen}>
        <SheetContent
          side="right"
          className="w-full p-3 sm:p-4 sm:max-w-7xl max-h-[95vh] overflow-y-auto [&>button]:hidden rounded-none sm:rounded-xl !right-0 sm:!right-4 !top-0 sm:!top-1/2 !-translate-y-0 sm:!-translate-y-1/2 scrollbar-hide"
        >
          <SheetHeader className="!p-0 mb-4">
            <div className="flex items-center justify-between">
              <SheetTitle>{tCompare('title')}</SheetTitle>
              <SheetClose className="rounded-full bg-white p-2 shadow-lg ring-1 ring-gray-200 transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2">
                <X className="h-4 w-4 text-gray-700" />
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="space-y-6">
            {/* AI Analysis Section */}
            {scholarships.length >= 2 && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{tCompare('aiAnalysis')}</h3>
                </div>

                {isLoadingComparison ? (
                  <div className="space-y-4">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ) : isErrorComparison || !comparisonData ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <AlertCircle className="w-5 h-5 text-red-600 mx-auto mb-2" />
                    <p className="text-red-600 text-sm">{tCompare('noAnalysis')}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Best Overall Match */}
                    {comparisonData.best_overall_match && (
                      <div className="bg-white rounded-lg p-4 border border-green-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <h4 className="font-semibold text-gray-900">{tCompare('bestMatch')}</h4>
                        </div>
                        <p className="font-medium text-gray-900 mb-2">
                          {comparisonData.best_overall_match.scholarship_name}
                        </p>
                        <ul className="space-y-1.5">
                          {comparisonData.best_overall_match.reasons.map((reason, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-green-600 mt-1">•</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Unique Advantages */}
                    {comparisonData.unique_advantages &&
                      comparisonData.unique_advantages.length > 0 && (
                        <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                          <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            <h4 className="font-semibold text-gray-900">
                              {tCompare('uniqueAdvantages')}
                            </h4>
                          </div>
                          <div className="space-y-4">
                            {comparisonData.unique_advantages.map((advantage, idx) => (
                              <div key={idx} className="border-l-2 border-blue-400 pl-3">
                                <p className="font-medium text-gray-900 mb-1.5">
                                  {advantage.scholarship_name}
                                </p>
                                <ul className="space-y-1">
                                  {advantage.advantages.map((adv, advIdx) => (
                                    <li
                                      key={advIdx}
                                      className="text-sm text-gray-700 flex items-start gap-2"
                                    >
                                      <span className="text-blue-600 mt-1">•</span>
                                      <span>{adv}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Key Tradeoffs */}
                    {comparisonData.key_tradeoffs && comparisonData.key_tradeoffs.length > 0 && (
                      <div className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertCircle className="w-5 h-5 text-amber-600" />
                          <h4 className="font-semibold text-gray-900">
                            {tCompare('keyTradeoffs')}
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {comparisonData.key_tradeoffs.map((tradeoff, idx) => (
                            <div key={idx} className="border-l-2 border-amber-400 pl-3">
                              <p className="font-medium text-gray-900 mb-1">{tradeoff.factor}</p>
                              <p className="text-sm text-gray-700">{tradeoff.comparison}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Strategic Recommendation */}
                    {comparisonData.strategic_recommendation && (
                      <div className="bg-white rounded-lg p-4 border border-purple-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="w-5 h-5 text-purple-600" />
                          <h4 className="font-semibold text-gray-900">
                            {tCompare('strategicRecommendation')}
                          </h4>
                        </div>
                        <div className="mb-3">
                          <p className="font-medium text-gray-900 mb-2">
                            {tCompare('priorityOrder')}:
                          </p>
                          <ol className="space-y-1.5 ml-4">
                            {comparisonData.strategic_recommendation.priority_order.map(
                              (scholarship, idx) => (
                                <li
                                  key={idx}
                                  className="text-sm text-gray-700 flex items-start gap-2"
                                >
                                  <span className="font-semibold text-purple-600">{idx + 1}.</span>
                                  <span>{scholarship}</span>
                                </li>
                              )
                            )}
                          </ol>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 mb-1.5">
                            {tCompare('reasoning')}:
                          </p>
                          <p className="text-sm text-gray-700">
                            {comparisonData.strategic_recommendation.reasoning}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Application Strategy */}
                    {comparisonData.application_strategy && (
                      <div className="bg-white rounded-lg p-4 border border-indigo-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-5 h-5 text-indigo-600" />
                          <h4 className="font-semibold text-gray-900">
                            {tCompare('applicationStrategy')}
                          </h4>
                        </div>
                        <div className="mb-3">
                          <p className="font-medium text-gray-900 mb-1.5">
                            {tCompare('approach')}:
                          </p>
                          <p className="text-sm text-gray-700">
                            {comparisonData.application_strategy.approach}
                          </p>
                        </div>
                        {comparisonData.application_strategy.timeline_tips &&
                          comparisonData.application_strategy.timeline_tips.length > 0 && (
                            <div>
                              <p className="font-medium text-gray-900 mb-2">
                                {tCompare('timelineTips')}:
                              </p>
                              <ul className="space-y-1.5">
                                {comparisonData.application_strategy.timeline_tips.map(
                                  (tip, idx) => (
                                    <li
                                      key={idx}
                                      className="text-sm text-gray-700 flex items-start gap-2"
                                    >
                                      <span className="text-indigo-600 mt-1">•</span>
                                      <span>{tip}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-3 font-semibold text-gray-700 min-w-[200px]">
                      {tCompare('scholarship')}
                    </th>
                    {scholarships.map((scholarship) => (
                      <th
                        key={scholarship.id}
                        className="text-left p-3 font-semibold text-gray-700 min-w-[250px] border-l border-gray-200"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">{scholarship.title}</p>
                          {scholarship.university && (
                            <p className="text-xs text-gray-500 mt-1">{scholarship.university}</p>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Provider/Organization */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-gray-500" />
                        {tCompare('provider')}
                      </div>
                    </td>
                    {scholarships.map((scholarship) => (
                      <td
                        key={scholarship.id}
                        className="p-3 text-gray-900 border-l border-gray-100"
                      >
                        {scholarship.providerProfileVo?.organizationName || '-'}
                      </td>
                    ))}
                  </tr>

                  {/* Country */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        {tCompare('country')}
                      </div>
                    </td>
                    {scholarships.map((scholarship) => (
                      <td
                        key={scholarship.id}
                        className="p-3 text-gray-900 border-l border-gray-100"
                      >
                        {scholarship.country || '-'}
                      </td>
                    ))}
                  </tr>

                  {/* University */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-gray-500" />
                        {tCompare('university')}
                      </div>
                    </td>
                    {scholarships.map((scholarship) => (
                      <td
                        key={scholarship.id}
                        className="p-3 text-gray-900 border-l border-gray-100"
                      >
                        {scholarship.university || '-'}
                      </td>
                    ))}
                  </tr>

                  {/* Study Level */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-700">{tCompare('studyLevel')}</td>
                    {scholarships.map((scholarship) => (
                      <td
                        key={scholarship.id}
                        className="p-3 text-gray-900 border-l border-gray-100"
                      >
                        {scholarship.studyLevel || '-'}
                      </td>
                    ))}
                  </tr>

                  {/* Scholarship Type */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-700">{tCompare('scholarshipType')}</td>
                    {scholarships.map((scholarship) => (
                      <td
                        key={scholarship.id}
                        className="p-3 text-gray-900 border-l border-gray-100"
                      >
                        {scholarship.scholarshipType || '-'}
                      </td>
                    ))}
                  </tr>

                  {/* Funding Amount */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        {tCompare('fundingAmount')}
                      </div>
                    </td>
                    {scholarships.map((scholarship) => (
                      <td
                        key={scholarship.id}
                        className="p-3 text-gray-900 border-l border-gray-100"
                      >
                        {scholarship.fundingAmount || '-'}
                      </td>
                    ))}
                  </tr>

                  {/* End Date */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {tCompare('deadline')}
                      </div>
                    </td>
                    {scholarships.map((scholarship) => (
                      <td
                        key={scholarship.id}
                        className="p-3 text-gray-900 border-l border-gray-100"
                      >
                        {scholarship.endDate
                          ? new Date(scholarship.endDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : '-'}
                      </td>
                    ))}
                  </tr>

                  {/* GPA Requirement */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-700">{tCompare('gpaRequirement')}</td>
                    {scholarships.map((scholarship) => (
                      <td
                        key={scholarship.id}
                        className="p-3 text-gray-900 border-l border-gray-100"
                      >
                        {scholarship.gpaRequirement ? `${scholarship.gpaRequirement}/4.0` : '-'}
                      </td>
                    ))}
                  </tr>

                  {/* Language Requirement */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-700">
                      {tCompare('languageRequirement')}
                    </td>
                    {scholarships.map((scholarship) => (
                      <td
                        key={scholarship.id}
                        className="p-3 text-gray-900 border-l border-gray-100"
                      >
                        {scholarship.languageRequirement || '-'}
                      </td>
                    ))}
                  </tr>

                  {/* Available Slots */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-700">{tCompare('availableSlots')}</td>
                    {scholarships.map((scholarship) => (
                      <td
                        key={scholarship.id}
                        className="p-3 text-gray-900 border-l border-gray-100"
                      >
                        {scholarship.availableSlots || '-'}
                      </td>
                    ))}
                  </tr>

                  {/* Description */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-700">{tCompare('description')}</td>
                    {scholarships.map((scholarship) => (
                      <td
                        key={scholarship.id}
                        className="p-3 text-gray-900 border-l border-gray-100"
                      >
                        <p className="text-sm line-clamp-3">
                          {scholarship.shortDescription || scholarship.description || '-'}
                        </p>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
