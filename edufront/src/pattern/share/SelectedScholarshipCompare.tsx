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
} from 'lucide-react';
import { Button } from '@/lib/cus/button';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/lib/cus/sheet';
import { useAuth } from '@/hooks/useAuth';
import { useAiComparisonQuery } from '@/state/apiScholarship';
import { Skeleton } from '@/lib/cus/skeleton';
import { Badge } from '@/lib/cus/badge';

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
          <SheetHeader className="!p-0 mb-2">
            <div className="flex items-center justify-between">
              <SheetTitle>{tCompare('title')}</SheetTitle>
              <SheetClose className="rounded-full bg-white p-2 shadow-lg ring-1 ring-gray-200 transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2">
                <X className="h-4 w-4 text-gray-700" />
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="space-y-6">
            {/* AI Analysis Section - Premium */}
            {scholarships.length >= 2 && (
              <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 rounded-2xl p-6 border-2 border-[#3D6CB9]/20 shadow-lg overflow-hidden">
                {/* Premium Badge */}
                <Badge
                  variant="default"
                  className="absolute top-4 right-4 bg-gradient-to-r from-[#3D6CB9] to-[#2F5A9E] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md"
                >
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  PREMIUM
                </Badge>

                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#3D6CB9] rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#2F5A9E] rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {tCompare('aiAnalysis')}
                    </h3>
                    <p className="text-sm text-gray-600">{tCompare('aiAnalysisDescription')}</p>
                  </div>

                  {isLoadingComparison ? (
                    <div className="space-y-4">
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="relative">
                          <div className="w-12 h-12 border-4 border-[#3D6CB9]/20 border-t-[#3D6CB9] rounded-full animate-spin"></div>
                        </div>
                        <p className="mt-4 text-[#3D6CB9] font-medium text-base">
                          {tCompare('analyzing')}
                        </p>
                      </div>
                      <Skeleton className="h-24 w-full rounded-xl" />
                      <Skeleton className="h-24 w-full rounded-xl" />
                      <Skeleton className="h-24 w-full rounded-xl" />
                    </div>
                  ) : isErrorComparison || !comparisonData ? (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                      <p className="text-red-600 font-medium">{tCompare('noAnalysis')}</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Header Stats Row */}
                      <div
                        className={`grid gap-4 ${
                          scholarships.length === 2
                            ? 'grid-cols-1 md:grid-cols-2'
                            : 'grid-cols-1 md:grid-cols-3'
                        }`}
                      >
                        {/* Best Match Card */}
                        {comparisonData.best_overall_match && (
                          <div className="bg-white rounded-xl p-5 border-2 border-[#3D6CB9] shadow-lg">
                            <div className="flex items-start justify-between mb-3">
                              <span className="px-3 py-1 bg-[#3D6CB9] text-white text-xs font-bold rounded-full">
                                #1 BEST MATCH
                              </span>
                            </div>
                            <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                              {tCompare('bestMatch')}
                            </h4>
                            <p className="text-base font-bold text-gray-900 mb-3 leading-tight">
                              {comparisonData.best_overall_match.scholarship_name}
                            </p>
                            <p className="text-xs text-[#3D6CB9] font-medium">
                              {comparisonData.best_overall_match.reasons.length} key reasons
                            </p>
                          </div>
                        )}

                        {/* Total Scholarships */}
                        <div className="bg-white rounded-xl p-5 border-2 border-gray-200 shadow-lg">
                          <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                            Total Compared
                          </h4>
                          <p className="text-3xl font-bold text-gray-900 mb-1">
                            {scholarships.length}
                          </p>
                          <p className="text-xs text-gray-600 font-medium">Scholarships</p>
                        </div>

                        {/* Analysis Score - Only show if 3 scholarships */}
                        {scholarships.length === 3 && (
                          <div className="bg-white rounded-xl p-5 border-2 border-gray-200 shadow-lg">
                            <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                              Analysis Ready
                            </h4>
                            <p className="text-3xl font-bold text-gray-900 mb-1">100%</p>
                            <p className="text-xs text-gray-600 font-medium">Complete</p>
                          </div>
                        )}
                      </div>

                      {/* Best Overall Match - Detailed */}
                      {comparisonData.best_overall_match && (
                        <div className="bg-white rounded-2xl p-6 border-2 border-[#3D6CB9] shadow-xl">
                          <div className="mb-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3D6CB9]/10 rounded-full mb-3">
                              <span className="w-2 h-2 bg-[#3D6CB9] rounded-full"></span>
                              <span className="text-sm font-bold text-[#3D6CB9] uppercase tracking-wide">
                                {tCompare('bestMatch')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">Perfect match for your profile</p>
                          </div>

                          <div className="mb-5 p-4 bg-[#3D6CB9]/5 rounded-xl border border-[#3D6CB9]/20">
                            <p className="text-lg font-bold text-gray-900">
                              {comparisonData.best_overall_match.scholarship_name}
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h5 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                              Why This Scholarship?
                            </h5>
                            <div className="grid gap-3">
                              {comparisonData.best_overall_match.reasons.map((reason, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#3D6CB9]/30 hover:bg-[#3D6CB9]/5 transition-all"
                                >
                                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3D6CB9] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                                    {idx + 1}
                                  </div>
                                  <p className="text-sm text-gray-700 leading-relaxed flex-1">
                                    {reason}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Unique Advantages - Grid Layout */}
                      {comparisonData.unique_advantages &&
                        comparisonData.unique_advantages.length > 0 && (
                          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-xl">
                            <div className="mb-6">
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-3">
                                <span className="w-2 h-2 bg-[#3D6CB9] rounded-full"></span>
                                <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                                  {tCompare('uniqueAdvantages')}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">
                                Standout features by scholarship
                              </p>
                            </div>
                            <div
                              className={`grid gap-4 ${
                                scholarships.length === 2
                                  ? 'grid-cols-1 md:grid-cols-2'
                                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                              }`}
                            >
                              {comparisonData.unique_advantages.map((advantage, idx) => (
                                <div
                                  key={idx}
                                  className="relative bg-gray-50 rounded-xl p-5 border-2 border-gray-200 hover:border-[#3D6CB9]/30 transition-all shadow-md"
                                >
                                  <div className="absolute top-2 right-2">
                                    <div className="w-8 h-8 rounded-full bg-[#3D6CB9] text-white flex items-center justify-center text-xs font-bold">
                                      {idx + 1}
                                    </div>
                                  </div>
                                  <div className="pr-10">
                                    <h5 className="font-bold text-base text-gray-900 mb-3 leading-tight">
                                      {advantage.scholarship_name}
                                    </h5>
                                    <div className="space-y-2.5">
                                      {advantage.advantages.map((adv, advIdx) => (
                                        <div
                                          key={advIdx}
                                          className="p-2 bg-white rounded-lg border border-gray-100"
                                        >
                                          <p className="text-sm text-gray-700 leading-relaxed flex-1 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#3D6CB9] before:rounded-full">
                                            {adv}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Key Tradeoffs - Responsive Grid */}
                      {comparisonData.key_tradeoffs && comparisonData.key_tradeoffs.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-xl">
                          <div className="mb-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-3">
                              <span className="w-2 h-2 bg-[#3D6CB9] rounded-full"></span>
                              <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                                {tCompare('keyTradeoffs')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">Important considerations</p>
                          </div>
                          <div
                            className={`grid gap-4 ${
                              scholarships.length === 2
                                ? 'grid-cols-1 md:grid-cols-2'
                                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                            }`}
                          >
                            {comparisonData.key_tradeoffs.map((tradeoff, idx) => (
                              <div
                                key={idx}
                                className="relative bg-gray-50 rounded-xl p-5 border-2 border-gray-200 hover:border-[#3D6CB9]/30 transition-all shadow-md"
                              >
                                <h5 className="font-bold text-base text-gray-900 mb-3 leading-tight pr-8">
                                  {tradeoff.factor}
                                </h5>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  {tradeoff.comparison}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Strategic Recommendation - Responsive Layout */}
                      {comparisonData.strategic_recommendation && (
                        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-xl">
                          <div className="mb-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-3">
                              <span className="w-2 h-2 bg-[#3D6CB9] rounded-full"></span>
                              <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                                {tCompare('strategicRecommendation')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">Your action plan</p>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Priority Order */}
                            <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
                              <h5 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-4">
                                {tCompare('priorityOrder')}
                              </h5>
                              <div className="space-y-3">
                                {comparisonData.strategic_recommendation.priority_order.map(
                                  (scholarship, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 border-gray-100 hover:border-[#3D6CB9]/30 transition-all shadow-sm"
                                    >
                                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3D6CB9] text-white flex items-center justify-center text-sm font-bold">
                                        {idx + 1}
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-900 leading-tight">
                                          {scholarship}
                                        </p>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            {/* Reasoning */}
                            <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
                              <h5 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-4">
                                {tCompare('reasoning')}
                              </h5>
                              <div className="p-4 bg-white rounded-lg border border-gray-100">
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  {comparisonData.strategic_recommendation.reasoning}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Application Strategy */}
                      {comparisonData.application_strategy && (
                        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-xl">
                          <div className="mb-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-3">
                              <span className="w-2 h-2 bg-[#3D6CB9] rounded-full"></span>
                              <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                                {tCompare('applicationStrategy')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">Step-by-step guidance</p>
                          </div>

                          {/* Approach Section */}
                          <div className="mb-6 p-5 bg-gray-50 rounded-xl border-2 border-gray-200">
                            <h5 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                              {tCompare('approach')}
                            </h5>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {comparisonData.application_strategy.approach}
                            </p>
                          </div>

                          {/* Timeline Tips */}
                          {comparisonData.application_strategy.timeline_tips &&
                            comparisonData.application_strategy.timeline_tips.length > 0 && (
                              <div>
                                <h5 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                                  {tCompare('timelineTips')}
                                </h5>
                                <div
                                  className={`grid gap-3 ${
                                    scholarships.length === 2
                                      ? 'grid-cols-1 md:grid-cols-2'
                                      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                  }`}
                                >
                                  {comparisonData.application_strategy.timeline_tips.map(
                                    (tip, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#3D6CB9]/30 hover:bg-[#3D6CB9]/5 transition-all"
                                      >
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3D6CB9] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                                          {idx + 1}
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed flex-1">
                                          {tip}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <h2 className="text-lg font-bold text-gray-900">{tCompare('comparisonTable')}</h2>
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
